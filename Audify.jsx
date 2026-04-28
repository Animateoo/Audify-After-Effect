// Audify v12.0 - The Orange Pose2Pose Match (Geometric Line-Art & Dynamic Scales)
(function(thisObj) {
    var isWin = ($.os.indexOf("Windows") !== -1);

    // EXACT Pose2Pose contrast ratios, but Orange highlighting!
    var PALETTE = {
        winBg: "#141414",     // Deep Pitch dark background to map gaps exactly
        btnBg: "#222222",     // Distinct Graphite block for the buttons (stands out clearly)
        hover: "#333333",     // Sleek hover shade
        highlight: "#F59B00", // "Aplicar" Golden-Orange matched from screenshot!
        iconHov: "#FFFFFF",   // Crisp white on mouseover
        headerText: "#000000" // Black text on Orange headers
    };

    function hexToArray(hexString) {
        var hexColor = hexString.replace("#", "");
        var r = parseInt(hexColor.slice(0, 2), 16) / 255;
        var g = parseInt(hexColor.slice(2, 4), 16) / 255;
        var b = parseInt(hexColor.slice(4, 6), 16) / 255;
        return [r, g, b, 1];
    }

    // Completely rebuilt to small, elegant line-art vectors inspired by Pose2Pose
    var VECTORS = {
        "IN": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2; 
            g.newPath(); g.moveTo(cx-10, cy+5); g.lineTo(cx-4, cy+5); g.lineTo(cx+6, cy-5); g.strokePath(btn.iconPen);
            g.newPath(); g.ellipsePath(cx+4.5, cy-6.5, 3, 3); g.fillPath(btn.iconBrush); // Keyframe dot
        },
        "OUT": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2;
            g.newPath(); g.moveTo(cx-8, cy-5); g.lineTo(cx+2, cy+5); g.lineTo(cx+8, cy+5); g.strokePath(btn.iconPen);
            g.newPath(); g.ellipsePath(cx-9.5, cy-6.5, 3, 3); g.fillPath(btn.iconBrush);
        },
        "INOUT": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2;
            g.newPath(); g.moveTo(cx-10, cy+5); g.lineTo(cx-6, cy+5); g.lineTo(cx-2, cy-4); g.lineTo(cx+2, cy-4); g.lineTo(cx+6, cy+5); g.lineTo(cx+10, cy+5); g.strokePath(btn.iconPen);
            g.newPath(); g.ellipsePath(cx-1.5, cy-5.5, 3, 3); g.fillPath(btn.iconBrush);
        },
        "VOL+": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2 + 1;
            g.newPath(); g.moveTo(cx-12, cy-3); g.lineTo(cx-8, cy-3); g.lineTo(cx-4, cy-7); 
            g.lineTo(cx-4, cy+7); g.lineTo(cx-8, cy+3); g.lineTo(cx-12, cy+3); g.fillPath(btn.iconBrush);
            g.newPath(); g.moveTo(cx+2, cy); g.lineTo(cx+10, cy); g.moveTo(cx+6, cy-4); g.lineTo(cx+6, cy+4); g.strokePath(btn.iconPen);
        },
        "VOL-": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2 + 1;
            g.newPath(); g.moveTo(cx-12, cy-3); g.lineTo(cx-8, cy-3); g.lineTo(cx-4, cy-7); 
            g.lineTo(cx-4, cy+7); g.lineTo(cx-8, cy+3); g.lineTo(cx-12, cy+3); g.fillPath(btn.iconBrush);
            g.newPath(); g.moveTo(cx+2, cy); g.lineTo(cx+10, cy); g.strokePath(btn.iconPen);
        },
        "REV": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2;
            g.newPath(); g.moveTo(cx+8, cy-4); g.lineTo(cx-4, cy-4); g.strokePath(btn.iconPen); 
            g.newPath(); g.moveTo(cx-4, cy-4); g.lineTo(cx-1, cy-7); g.strokePath(btn.iconPen); 
            g.newPath(); g.moveTo(cx-4, cy-4); g.lineTo(cx-1, cy-1); g.strokePath(btn.iconPen); 
            g.newPath(); g.moveTo(cx-8, cy+4); g.lineTo(cx+4, cy+4); g.strokePath(btn.iconPen); 
            g.newPath(); g.moveTo(cx+4, cy+4); g.lineTo(cx+1, cy+1); g.strokePath(btn.iconPen); 
            g.newPath(); g.moveTo(cx+4, cy+4); g.lineTo(cx+1, cy+7); g.strokePath(btn.iconPen); 
        },
        "HIGHLOW": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2;
            g.newPath(); g.moveTo(cx-10, cy+6); g.lineTo(cx-5, cy+6); 
            g.lineTo(cx-2, cy-4); g.lineTo(cx+2, cy-4); 
            g.lineTo(cx+5, cy+6); g.lineTo(cx+10, cy+6);
            g.strokePath(btn.iconPen);
            g.newPath(); g.moveTo(cx-5, cy+8); g.lineTo(cx-5, cy+2); g.strokePath(btn.iconPen);
            g.newPath(); g.moveTo(cx+5, cy+8); g.lineTo(cx+5, cy+2); g.strokePath(btn.iconPen);
        },
        "COMPRESSOR": function(g, bw, bh, btn) {
            var cx = bw/2, cy = bh/2;
            g.newPath(); g.moveTo(cx-4, cy-6); g.lineTo(cx, cy-2); g.lineTo(cx+4, cy-6); g.strokePath(btn.iconPen);
            g.newPath(); g.moveTo(cx, cy-8); g.lineTo(cx, cy-2); g.strokePath(btn.iconPen);
            g.newPath(); g.moveTo(cx-4, cy+6); g.lineTo(cx, cy+2); g.lineTo(cx+4, cy+6); g.strokePath(btn.iconPen);
            g.newPath(); g.moveTo(cx, cy+8); g.lineTo(cx, cy+2); g.strokePath(btn.iconPen);
            g.newPath(); g.moveTo(cx-8, cy); g.lineTo(cx+8, cy); g.strokePath(btn.iconPen);
        },
        "TEXT": function(g, bw, bh, btn) {
            if(isWin) try{g.font=ScriptUI.newFont("Segoe UI","BOLD",13);}catch(e){} 
            var ts = g.measureString(btn.text);
            g.drawString(btn.text, btn.textPen, (bw-ts[0])/2, (bh-ts[1])/1.75);
        }
    };

    function audifyCoreDraw() {
        this.graphics.drawOSControl();
        this.graphics.rectPath(0, 0, this.size[0], this.size[1]);
        this.graphics.fillPath(this.fillBrush);
        VECTORS[this.drawId](this.graphics, this.size[0], this.size[1], this);
    }

    function updateAudifyButton(btn, bgColor, iconColor, textColor) {
        btn.isHover = (bgColor == PALETTE.hover);
        btn.fillBrush = btn.graphics.newBrush(btn.graphics.BrushType.SOLID_COLOR, hexToArray(bgColor));
        btn.iconBrush = btn.graphics.newBrush(btn.graphics.BrushType.SOLID_COLOR, hexToArray(iconColor));
        btn.iconPen = btn.graphics.newPen(btn.graphics.PenType.SOLID_COLOR, hexToArray(iconColor), 2); // 2px delicate line-art stroke
        btn.textPen = btn.graphics.newPen(btn.graphics.PenType.SOLID_COLOR, hexToArray(textColor || iconColor), 1);
        btn.onDraw = audifyCoreDraw; 
        return btn;
    }

    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Audify", undefined, {resizeable:true});
        if (win != null) {
            win.orientation = "column"; 
            win.alignChildren = ["fill", "top"]; 
            win.spacing = 0; win.margins = 0; 
            win.graphics.backgroundColor = win.graphics.newBrush(win.graphics.BrushType.SOLID_COLOR, hexToArray(PALETTE.winBg));

            var content = win.add("group");
            content.orientation = "column";
            content.alignChildren = ["fill", "top"];
            content.margins = 14; 
            content.spacing = 8;  

            var focusStealer = win.add("edittext", undefined, ""); focusStealer.visible = false;
            function clearFocus() { try { focusStealer.active = true; } catch(e){} }

            function buildHeader(parentRow, text) {
                var btn = parentRow.add("button", undefined, "");
                btn.alignment = ["fill", "top"];
                btn.preferredSize.height = 20; 
                btn.text = text; btn.drawId = "TEXT";
                // Solid Orange w/ Black Text Layout
                btn.fillBrush = btn.graphics.newBrush(btn.graphics.BrushType.SOLID_COLOR, hexToArray(PALETTE.highlight));
                btn.iconBrush = btn.graphics.newBrush(btn.graphics.BrushType.SOLID_COLOR, hexToArray(PALETTE.headerText));
                btn.iconPen = btn.graphics.newPen(btn.graphics.PenType.SOLID_COLOR, hexToArray(PALETTE.headerText), 1);
                btn.textPen = btn.graphics.newPen(btn.graphics.PenType.SOLID_COLOR, hexToArray(PALETTE.headerText), 1);
                btn.onDraw = audifyCoreDraw;
                return btn;
            }

            function btnFactory(parentRow, textLabel, tipText, drawId, action) {
                var btn = parentRow.add("button", undefined, "", {name: "ok"});
                btn.alignment = ["fill", "top"]; 
                btn.preferredSize.height = 36; 
                btn.helpTip = tipText;
                btn.text = textLabel; 
                btn.drawId = drawId;
                
                updateAudifyButton(btn, PALETTE.btnBg, PALETTE.highlight);
                
                try {
                    btn.addEventListener("mouseover", function() { updateAudifyButton(this, PALETTE.hover, PALETTE.iconHov); });
                    btn.addEventListener("mouseout", function() { updateAudifyButton(this, PALETTE.btnBg, PALETTE.highlight); });
                } catch(e) {}
                
                if(action) btn.onClick = function(){ action(); clearFocus(); };
                return btn;
            }

            function addRow() {
                var r = content.add("group");
                r.orientation = "row"; r.alignChildren = ["fill", "top"]; r.alignment = ["fill", "top"];
                r.spacing = 6; r.margins = 0; 
                return r;
            }

            // --- BLOCK 1: Audio Controls ---
            buildHeader(content, "Audio Controls");
            
            var r1 = addRow();
            btnFactory(r1, "", "Fade In", "IN", function(){applyFade("in");});
            btnFactory(r1, "", "Fade Out", "OUT", function(){applyFade("out");});
            btnFactory(r1, "", "Fade In/Out", "INOUT", function(){applyFade("both");});

            var r2 = addRow();
            var dbGrp = r2.add("group");
            dbGrp.alignment = ["fill", "top"];
            dbGrp.preferredSize.height = 36;
            dbGrp.orientation = "row";
            dbGrp.alignChildren = ["fill", "center"]; 
            dbGrp.margins = 0; dbGrp.spacing = 8;
            
            var dbRef = dbGrp.add("edittext", undefined, "3");
            dbRef.alignment = ["fill", "center"]; 
            dbRef.preferredSize.height = 36; // Hardcode size to match buttons completely!
            dbRef.preferredSize.width = 40;  // Minimum width
            dbRef.graphics.font = ScriptUI.newFont("Segoe UI", "BOLD", 16); 
            dbRef.justify = "center";
            
            var dst = dbGrp.add("statictext", undefined, "dB");
            dst.alignment = ["right", "center"];
            if(isWin) try{dst.graphics.font=ScriptUI.newFont("Segoe UI","BOLD",14);}catch(e){} 
            dst.graphics.foregroundColor = dst.graphics.newPen(dst.graphics.PenType.SOLID_COLOR, hexToArray(PALETTE.highlight), 1);

            btnFactory(r2, "", "Vol -", "VOL-", function(){var v=parseFloat(dbRef.text); if(!isNaN(v)) shiftVol(-v);});
            btnFactory(r2, "", "Vol +", "VOL+", function(){var v=parseFloat(dbRef.text); if(!isNaN(v)) shiftVol(v);});

            // --- BLOCK 2: Effects & Ducking ---
            buildHeader(content, "Effects & Ducking");

            var r3 = addRow();
            btnFactory(r3, "", "Reverse", "REV", applyRev);
            btnFactory(r3, "", "High-Low Pass", "HIGHLOW", function(){applyAudioEffect("ADBE Aud High-Low Pass", "High-Low Pass", "Paso alto y bajo");});
            btnFactory(r3, "", "Compressor", "COMPRESSOR", function(){applyAudioEffect("ADBE Aud Compressor", "Compressor", "Compresor");});

            var r4 = addRow();
            btnFactory(r4, "Detect", "Detect Audio Source", "TEXT", applySetVoice);
            btnFactory(r4, "Ducking", "Apply Ducking", "TEXT", applyDucking);

            win.onResizing = win.onResize = function() { this.layout.resize(); };

            // -- CORE AUDIO METHODS --
            function applyFade(type) {
                var comp = app.project.activeItem; if (!comp || !(comp instanceof CompItem)) return;
                app.beginUndoGroup("Fade Audio");
                var sel = comp.selectedLayers; var dur = 1.0; 
                for (var i = 0; i < sel.length; i++) {
                    var l = sel[i]; if (!l.hasAudio) continue;
                    var lvl = l.property("Audio").property("Audio Levels");
                    var slnt = [-48, -48];
                    var norm = lvl.numKeys > 0 ? lvl.valueAtTime(l.inPoint + dur + 0.1, true) : lvl.value;
                    if (type == "in" || type == "both") { lvl.setValueAtTime(l.inPoint, slnt); lvl.setValueAtTime(l.inPoint + dur, norm); }
                    if (type == "out" || type == "both") { lvl.setValueAtTime(l.outPoint - dur, norm); lvl.setValueAtTime(l.outPoint, slnt); }
                }
                app.endUndoGroup();
            }
            function shiftVol(amt) {
                var comp = app.project.activeItem; if (!comp || !(comp instanceof CompItem)) return;
                app.beginUndoGroup("Change Volume");
                var sel = comp.selectedLayers;
                for (var i = 0; i < sel.length; i++) {
                    var l = sel[i]; if (!l.hasAudio) continue;
                    var lvl = l.property("Audio").property("Audio Levels");
                    if (lvl.numKeys > 0) {
                        var kIds = lvl.selectedKeys.length > 0 ? lvl.selectedKeys : null;
                        var num = lvl.numKeys;
                        for(var k = 1; k <= num; k++) {
                            if (kIds == null || kIds.indexOf(k) !== -1) {
                                var val = lvl.keyValue(k); lvl.setValueAtKey(k, [val[0] + amt, val[1] + amt]);
                            }
                        }
                    } else { var val = lvl.value; lvl.setValue([val[0] + amt, val[1] + amt]); }
                }
                app.endUndoGroup();
            }
            function applyAudioEffect(mName, a1, a2) {
                var comp = app.project.activeItem; if (!comp || !(comp instanceof CompItem)) return;
                app.beginUndoGroup("Apply Effect");
                var sel = comp.selectedLayers;
                for (var i = 0; i < sel.length; i++) {
                    if (sel[i].hasAudio) {
                        var fx = sel[i].property("Effects");
                        try { fx.addProperty(mName); } catch(e) { try { fx.addProperty(a1); } catch(err) { try { fx.addProperty(a2); } catch(err2) {} } }
                    }
                }
                app.endUndoGroup();
            }
            function applyRev() {
                var comp = app.project.activeItem; if (!comp || !(comp instanceof CompItem)) return;
                app.beginUndoGroup("Reverse Audio");
                var cId = 2135; try { var locId = app.findMenuCommandId("Time-Reverse Layer"); if (locId) cId = locId; } catch(e) {}
                app.executeCommand(cId);
                var sel = comp.selectedLayers;
                for (var i = 0; i < sel.length; i++) {
                    sel[i].property("Marker").setValueAtTime(sel[i].inPoint, new MarkerValue(" Reverse "));
                }
                app.endUndoGroup();
            }

            function applySetVoice() {
                var comp = app.project.activeItem; if (!comp || !(comp instanceof CompItem)) return;
                if (comp.selectedLayers.length == 0) { alert("Selecciona tus pistas de Audio (Voces, SFX, etc) primero."); return; }
                app.beginUndoGroup("Detect Audio");
                for (var i=0; i<comp.selectedLayers.length; i++) {
                    var l = comp.selectedLayers[i];
                    if (!l.hasAudio) continue;
                    var fx = l.property("Effects");
                    var tag = fx.property("DETECT_TAG");
                    if (!tag) { 
                        tag = fx.addProperty("ADBE Checkbox Control"); 
                        tag.name = "DETECT_TAG"; 
                        tag.property("Checkbox").setValue(true);
                    }
                }
                app.endUndoGroup();
            }
            function applyDucking() {
                var comp = app.project.activeItem; if (!comp || !(comp instanceof CompItem)) return;
                if (comp.selectedLayers.length == 0) { alert("Selecciona las pistas de Música."); return; }
                
                app.beginUndoGroup("Apply Ducking");
                var musicLayers = [];
                for (var i=0; i<comp.selectedLayers.length; i++) musicLayers.push(comp.selectedLayers[i]);

                // 1. Find the source layers previously tagged
                var voiceLayers = [];
                for (var i=1; i<=comp.numLayers; i++) {
                    var l = comp.layer(i);
                    var fx = l.property("Effects");
                    if (fx && fx.property("DETECT_TAG")) voiceLayers.push(l);
                }
                
                if (voiceLayers.length == 0) {
                    alert("¡Primero usa el botón 'Detect' para indicar cuáles son los audios principales a respetar!");
                    return;
                }

                // 2. Select ONLY voice layers to convert to keyframes natively
                for (var i=1; i<=comp.numLayers; i++) comp.layer(i).selected = false;
                for (var i=0; i<voiceLayers.length; i++) voiceLayers[i].selected = true;

                // 3. Extract Audio Amplitude
                var cId = 2735; try { var locId = app.findMenuCommandId("Convert Audio to Keyframes"); if (locId) cId = locId; } catch(e) {}
                app.executeCommand(cId);
                
                var ampLayer = comp.layer(1);
                
                // Restore Music selection
                for (var i=1; i<=comp.numLayers; i++) comp.layer(i).selected = false;
                for (var i=0; i<musicLayers.length; i++) musicLayers[i].selected = true;

                // 4. Secretly copy keyframes to the music layer and delete the Null
                if (ampLayer && ampLayer.name == "Audio Amplitude") {
                    var sliderToCopy = ampLayer.property("Effects").property("Both Channels");
                    if (!sliderToCopy) sliderToCopy = ampLayer.property("Effects").property(1);
                    
                    var propToCopy = sliderToCopy.property("Slider");
                    var tArr = []; var vArr = [];
                    for(var k=1; k<=propToCopy.numKeys; k++){
                        tArr.push(propToCopy.keyTime(k));
                        vArr.push(propToCopy.keyValue(k));
                    }

                    for (var i=0; i<musicLayers.length; i++) {
                        var selLyr = musicLayers[i];
                        var fx = selLyr.property("Effects");
                        
                        // Universal Localization fix: use property(1) instead of property('Slider')
                        var ampSlider = fx.property("[ DATA ] Amplitude"); // Obfuscated name so user knows it's system cache
                        if (!ampSlider) { ampSlider = fx.addProperty("ADBE Slider Control"); ampSlider.name = "[ DATA ] Amplitude"; }
                        
                        var targetProp = ampSlider.property(1);
                        while(targetProp.numKeys > 0) targetProp.removeKey(1);
                        if (tArr.length > 0) targetProp.setValuesAtTimes(tArr, vArr);
                        
                        function ensureSlider(name, val) {
                            var s = fx.property(name);
                            if (!s) { s = fx.addProperty("ADBE Slider Control"); s.name = name; }
                            s.property(1).setValue(val);
                        }

                        ensureSlider("Sensitivity", 6.0);
                        ensureSlider("Duck Amount", -12.0);
                        ensureSlider("Fade Duration", 800);
                        ensureSlider("Fade Position", 0.0);
                        
                        var expr = "var sens = effect('Sensitivity')(1).value;\n" +
                                   "var duckAmt = effect('Duck Amount')(1).value;\n" +
                                   "var fadeMs = effect('Fade Duration')(1).value;\n" +
                                   "var fadePos = effect('Fade Position')(1).value;\n" +
                                   "var fadeSec = Math.max(0.01, fadeMs / 1000);\n" +
                                   "var tOffset = fadePos * 0.1;\n" +
                                   "var amp = 0;\n" +
                                   "try { amp = effect('[ DATA ] Amplitude')(1).smooth(fadeSec, 15, time + tOffset); } catch(e) {}\n" +
                                   "var thresh = linear(clamp(sens, 0, 10), 0, 10, 20, 0.5);\n" +
                                   "var drop = ease(amp, thresh, thresh + 5, 0, duckAmt);\n" +
                                   "value + [drop, drop];";
                        selLyr.property("Audio").property("Audio Levels").expression = expr;
                    }
                    ampLayer.remove(); // Completely destroy the Null, keeping workspace clean!
                }
                app.endUndoGroup();
            }
        }
        return win;
    }

    var myPanel = buildUI(thisObj);
    if ((myPanel != null) && (myPanel instanceof Window)) {
        myPanel.center(); myPanel.show();
    } else if (myPanel != null) {
        myPanel.layout.layout(true);
    }
})(this);
