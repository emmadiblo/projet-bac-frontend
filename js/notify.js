var Notyf = function () { 
  "use strict"; 
  
  var e, o = function () { 
    return (o = Object.assign || function (t) { 
      for (var i, e = 1, n = arguments.length; e < n; e++)
        for (var o in i = arguments[e]) 
          Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]); 
      return t 
    }).apply(this, arguments) 
  }, 
  
  n = (t.prototype.on = function (t, i) { 
    var e = this.listeners[t] || []; 
    this.listeners[t] = e.concat([i]) 
  }, t.prototype.triggerEvent = function (t, i) { 
    var e = this; 
    (this.listeners[t] || []).forEach(function (t) { 
      return t({ target: e, event: i }) 
    }) 
  }, t); 
  
  function t(t) { 
    this.options = t, this.listeners = {} 
  } 
  
  (i = e = e || {})[i.Add = 0] = "Add", i[i.Remove = 1] = "Remove"; 
  
  var f, i, s = (a.prototype.push = function (t) { 
    this.notifications.push(t), this.updateFn(t, e.Add, this.notifications) 
  }, a.prototype.splice = function (t, i) { 
    i = this.notifications.splice(t, i)[0]; 
    return this.updateFn(i, e.Remove, this.notifications), i 
  }, a.prototype.indexOf = function (t) { 
    return this.notifications.indexOf(t) 
  }, a.prototype.onUpdate = function (t) { 
    this.updateFn = t 
  }, a); 
  
  function a() { 
    this.notifications = [] 
  } 
  
  (i = f = f || {}).Dismiss = "dismiss"; 
  
  var r = { 
    types: [
      { type: "success", className: "notyf__toast--success", backgroundColor: "#3dc763", icon: { className: "notyf__icon--success", tagName: "i" } }, 
      { type: "error", className: "notyf__toast--error", backgroundColor: "#ed3d3d", icon: { className: "notyf__icon--error", tagName: "i" } }
    ], 
    duration: 2e3, 
    ripple: !0, 
    position: { x: "right", y: "bottom" }, 
    dismissible: !(i.Click = "click") 
  }, 
  
  c = (p.prototype.on = function (t, i) { 
    var e; 
    this.events = o(o({}, this.events), ((e = {})[t] = i, e)) 
  }, p.prototype.update = function (t, i) { 
    i === e.Add ? this.addNotification(t) : i === e.Remove && this.removeNotification(t) 
  }, p.prototype.removeNotification = function (t) { 
    var i, e, n = this, t = this._popRenderedNotification(t); 
    t && ((e = t.node).classList.add("notyf__toast--disappear"), e.addEventListener(this.animationEndEventName, i = function (t) { 
      t.target === e && (e.removeEventListener(n.animationEndEventName, i), n.container.removeChild(e)) 
    })) 
  }, p.prototype.addNotification = function (t) { 
    var i = this._renderNotification(t); 
    this.notifications.push({ notification: t, node: i }), this._announce(t.options.message || "Notification") 
  }, p.prototype._renderNotification = function (t) { 
    var i = this._buildNotificationCard(t), e = t.options.className; 
    return e && (t = i.classList).add.apply(t, e.split(" ")), this.container.appendChild(i), i 
  }, p.prototype._popRenderedNotification = function (t) { 
    for (var i = -1, e = 0; e < this.notifications.length && i < 0; e++)
      this.notifications[e].notification === t && (i = e); 
    if (-1 !== i) return this.notifications.splice(i, 1)[0] 
  }, p.prototype.getXPosition = function (t) { 
    return (null === (t = null == t ? void 0 : t.position) || void 0 === t ? void 0 : t.x) || "right" 
  }, p.prototype.getYPosition = function (t) { 
    return (null === (t = null == t ? void 0 : t.position) || void 0 === t ? void 0 : t.y) || "bottom" 
  }, p.prototype.adjustContainerAlignment = function (t) { 
    var i = this.X_POSITION_FLEX_MAP[this.getXPosition(t)], e = this.Y_POSITION_FLEX_MAP[this.getYPosition(t)], t = this.container.style; 
    t.setProperty("justify-content", e), t.setProperty("align-items", i) 
  }, 
  
  // Fonction _buildNotificationCard modifiée avec votre code Feather
  p.prototype._buildNotificationCard = function (n) { 
    var o = this, t = n.options, i = t.icon; 
    this.adjustContainerAlignment(t); 
    
    var e = this._createHTMLElement({ tagName: "div", className: "notyf__toast" }), 
        s = this._createHTMLElement({ tagName: "div", className: "notyf__ripple" }), 
        a = this._createHTMLElement({ tagName: "div", className: "notyf__wrapper" }), 
        r = this._createHTMLElement({ tagName: "div", className: "notyf__message" }); 
    
    r.innerHTML = t.message || ""; 
    
    var c, p, d, l, u = t.background || t.backgroundColor; 
    
    // VOTRE CODE FEATHER INTÉGRÉ ICI
    if (i) {
      const iconContainer = this._createHTMLElement({ tagName: "div", className: "notyf__icon" });
      
      // Ici on crée l'icône Feather selon le type de notification
      let featherIconName = "";

      switch(n.options.type) {
        case "success":
          featherIconName = "check-circle";
          break;
        case "error":
          featherIconName = "x-circle";
          break;
        case "warning":
          featherIconName = "alert-triangle";
          break;
        case "info":
          featherIconName = "info";
          break;
        default:
          featherIconName = "bell";
      }

      // Création de la balise <i> Feather
      const featherIcon = this._createHTMLElement({ tagName: "i", className: "feather-icon" });
      featherIcon.setAttribute("data-feather", featherIconName);

      iconContainer.appendChild(featherIcon);

      // Ajout avant le message
      a.appendChild(iconContainer);
    }
    
    a.appendChild(r);
    e.appendChild(a);
    
    u && (t.ripple ? (s.style.background = u, e.appendChild(s)) : e.style.background = u);
    
    if (t.dismissible) {
      s = this._createHTMLElement({ tagName: "div", className: "notyf__dismiss" });
      u = this._createHTMLElement({ tagName: "button", className: "notyf__dismiss-btn" });
      s.appendChild(u);
      a.appendChild(s);
      e.classList.add("notyf__toast--dismissible");
      u.addEventListener("click", function (t) { 
        var i, e; 
        null !== (e = (i = o.events)[f.Dismiss]) && void 0 !== e && e.call(i, { target: n, event: t }), t.stopPropagation() 
      });
    }
    
    e.addEventListener("click", function (t) { 
      var i, e; 
      return null === (e = (i = o.events)[f.Click]) || void 0 === e ? void 0 : e.call(i, { target: n, event: t }) 
    }); 
    
    t = "top" === this.getYPosition(t) ? "upper" : "lower"; 
    return e.classList.add("notyf__toast--" + t), e 
  }, 
  
  // Reste du code original...
  p.prototype._createHTMLElement = function (t) { 
    var i = t.tagName, e = t.className, t = t.text, i = document.createElement(i); 
    return e && (i.className = e), i.textContent = t || null, i 
  }, p.prototype._createA11yContainer = function () { 
    var t = this._createHTMLElement({ tagName: "div", className: "notyf-announcer" }); 
    t.setAttribute("aria-atomic", "true"), t.setAttribute("aria-live", "polite"), t.style.border = "0", t.style.clip = "rect(0 0 0 0)", t.style.height = "1px", t.style.margin = "-1px", t.style.overflow = "hidden", t.style.padding = "0", t.style.position = "absolute", t.style.width = "1px", t.style.outline = "0", document.body.appendChild(t), this.a11yContainer = t 
  }, p.prototype._announce = function (t) { 
    var i = this; 
    this.a11yContainer.textContent = "", setTimeout(function () { 
      i.a11yContainer.textContent = t 
    }, 100) 
  }, p.prototype._getAnimationEndEventName = function () { 
    var t, i = document.createElement("_fake"), e = { MozTransition: "animationend", OTransition: "oAnimationEnd", WebkitTransition: "webkitAnimationEnd", transition: "animationend" }; 
    for (t in e) if (void 0 !== i.style[t]) return e[t]; 
    return "animationend" 
  }, p); 
  
  function p() { 
    this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = { left: "flex-start", center: "center", right: "flex-end" }, this.Y_POSITION_FLEX_MAP = { top: "flex-start", center: "center", bottom: "flex-end" }; 
    var t = document.createDocumentFragment(), i = this._createHTMLElement({ tagName: "div", className: "notyf" }); 
    t.appendChild(i), document.body.appendChild(t), this.container = i, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer() 
  } 
  
  function d(t) { 
    var e = this; 
    this.dismiss = this._removeNotification, this.notifications = new s, this.view = new c; 
    var i = this.registerTypes(t); 
    this.options = o(o({}, r), t), this.options.types = i, this.notifications.onUpdate(function (t, i) { 
      return e.view.update(t, i) 
    }), this.view.on(f.Dismiss, function (t) { 
      var i = t.target, t = t.event; 
      e._removeNotification(i), i.triggerEvent(f.Dismiss, t) 
    }), this.view.on(f.Click, function (t) { 
      var i = t.target, t = t.event; 
      return i.triggerEvent(f.Click, t) 
    }) 
  } 
  
  return d.prototype.error = function (t) { 
    t = this.normalizeOptions("error", t); 
    return this.open(t) 
  }, d.prototype.success = function (t) { 
    t = this.normalizeOptions("success", t); 
    return this.open(t) 
  }, d.prototype.open = function (i) { 
    var t = this.options.types.find(function (t) { 
      return t.type === i.type 
    }) || {}, t = o(o({}, t), i); 
    this.assignProps(["ripple", "position", "dismissible"], t); 
    t = new n(t); 
    return this._pushNotification(t), t 
  }, d.prototype.dismissAll = function () { 
    for (; this.notifications.splice(0, 1);); 
  }, d.prototype.assignProps = function (t, i) { 
    var e = this; 
    t.forEach(function (t) { 
      i[t] = (null == i[t] ? e.options : i)[t] 
    }) 
  }, d.prototype._pushNotification = function (t) { 
    var i = this; 
    this.notifications.push(t); 
    var e = (void 0 !== t.options.duration ? t : this).options.duration; 
    e && setTimeout(function () { 
      return i._removeNotification(t) 
    }, e) 
  }, d.prototype._removeNotification = function (t) { 
    t = this.notifications.indexOf(t); 
    -1 !== t && this.notifications.splice(t, 1) 
  }, d.prototype.normalizeOptions = function (t, i) { 
    t = { type: t }; 
    return "string" == typeof i ? t.message = i : "object" == typeof i && (t = o(o({}, t), i)), t 
  }, d.prototype.registerTypes = function (t) { 
    var i = (t && t.types || []).slice(); 
    return r.types.map(function (e) { 
      var n = -1; 
      i.forEach(function (t, i) { 
        t.type === e.type && (n = i) 
      }); 
      var t = -1 !== n ? i.splice(n, 1)[0] : {}; 
      return o(o({}, e), t) 
    }).concat(i) 
  }, d 
}();
