var CookieBanner = {
    config: {
        "name":         "allowCookies",
        "expire":       9983369, // 9983369 è il massimo tempo di scadenza di una cookie
        "msg":          "This site use cookies. To navigate it, you must accept cookie terms.",
        "infoLink":     location.href+"#",
        "infoLinkMsg":  "More Info",
        "acceptMsg":    "Accept"
    },
    
    permision: false,
    
    showed: false,
    
    bodyStyle: undefined,
    
    mustShow: function(){
        if (!this.showed) {
            if (parseInt(Cookies.get(this.config.name)) !== 1) {
                return true;
            }
        }
        return false;
    },
    
    setConfig: function(config){
        Object.keys(config).forEach(function(ind){
            this.config[ind] = config[ind];
        }.bind(this));
    },
    
    askPermision: function(){
        
        var bg = document.createElement('div');
        bg.setAttribute('id', "cookieBannerBg");
        bg.setAttribute('style', "position: fixed;height: 100%;height: 100vh;width: 100%;width: 100vw;background-color: #000;background-color: rgba(0,0,0,.8);z-index: 900000;");
        
        var display = document.createElement('div');
        display.setAttribute('id', "cookieBannerDisplay");
        display.setAttribute('style', "max-height: 50%;width: 70%;background-color: #FFF;top: 25%;position: fixed;left: 15%;text-align: center;padding: 30px;box-sizing: border-box;overflow: auto;line-height: 14px;");
        
        var text = document.createElement('p');
        text.appendChild(document.createTextNode(this.config.msg));
        
        var info = document.createElement('a');
        info.setAttribute('href', this.config.infoLink);
        info.appendChild(document.createTextNode(this.config.infoLinkMsg));
        info.setAttribute('style', 'background-color: #34DDF4;text-decoration: none;color: #FFF;padding: 5px;border-width: 0 1px 2px 0;border-color: #258D9B;border-style: solid;border-radius: 5px 2px;box-sizing: border-box;height: 28px;width: 30%;margin-right:2px;display: inline-block;font-size:14px;font-family: sans-serif;');
        
        var acc = document.createElement('button');
        acc.setAttribute('onclick', 'CookieBanner.acceptTerms()');
        acc.appendChild(document.createTextNode(this.config.acceptMsg));
        acc.setAttribute('style','background-color: #34DDF4;text-decoration: none;color: #FFF;padding: 5px;border-width: 0 0 2px 1px;border-color: #258D9B;border-style: solid;border-radius: 2px 5px;box-sizing: border-box;height: 28px;width: 30%;display: inline-block;font-size:13px;font-family: sans-serif;');
        
        display.appendChild(text);
        display.appendChild(info);
        display.appendChild(acc);
        bg.appendChild(display);
        
        if (document.body.children[0] !== undefined) {
            document.body.insertBefore(bg, document.body.children[0]);
        } else {
            document.body.appendChild(bg);
        }
        this.bodyStyle = document.body.style.cssText;
        document.body.style.cssText = 'overflow: hidden; box-sizing: border-box; background: #000;';
    },
    
    quitBanner: function(){
        document.body.style.cssText = this.bodyStyle;
        document.body.removeChild(document.getElementById('cookieBannerBg'));
    },
    
    show: function(){
        if (this.mustShow()){
            this.showed = true;
            this.askPermision();
        }
    },
    
    acceptTerms: function(){
        this.quitBanner();
        this.permision = true;
        this.setHandler();
    },
    
    declineTerms: function(){
        this.quitBanner();
        this.permision = false;
    },
    
    setHandler: function(){
        if (!this.mustShow() && this.permision){
            var func = function(){
                if (Cookies.get(this.config.name) !== 1) {
                    Cookies.set(this.config.name, 1, {expires: parseInt(this.config.expire)});
                }
            }.bind(this);
            if (window.addEventListener){
                (function(){
                window.addEventListener('beforeunload', func, false);
                })();
            } else {
                window.attachEvent('onbeforeunload', func);
            }
        }
    }
};

//if (Cookies.get(CookieBanner.config.name) !== undefined){if(prompt('Borrar Cookie?',1) == true){Cookies.remove(CookieBanner.config.name);if(prompt('setHandler?',1) == true){CookieBanner.show();CookieBanner.setHandler();}}}else if(CookieBanner.mustShow() === true){if(prompt('create cookie on exit?', 1) == true){CookieBanner.permision = true;CookieBanner.show();}}
