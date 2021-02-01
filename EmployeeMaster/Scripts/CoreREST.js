//var apiSn = "http://localhost:59152/";
var apiSn = "../../";
var CoreREST = {
    requestInvoke: function (ctn, actn, parms, method, successcallback, failurecallback, successCallbackExtraparams) {
        var datapara = "";
        debugger;
        if (parms != null) {
            for (var j = 0; j < parms.length; j++) {
                var value = parms[j].value;
                if (parms[j].type == "JSON") {
                    value = JSON.stringify(value);
                }

                if (j == 0) {
                    datapara = parms[j].name + "=" + value;
                }
                else {
                    datapara += "&" + parms[j].name + "=" + value;
                }
            }
        }
        var aurl = apiSn + ctn + "/" + actn;
        datapara = parms;
        var start_time = new Date().getTime();
        $.ajax({
            type: method,
            url: aurl,
            data: datapara,
            async: false,
            cache: false,
            success: function (response) {
                var request_time = new Date().getTime() - start_time;
                $("#servertimer").html(request_time);
             successcallback(response, successCallbackExtraparams);
            },
            complete: function (e, t, n) {
                console.log(e);
                console.log(t);
                console.log(n);
                //$("#spnintimate").html("Binding");
            },
            error: function (e) {
                failurecallback(e);
            }
        });
    }
}



//CoreREST = {
		
//    _defaultServer: "http://localhost:53367",
//		accessKey: "dummy",

//		_addContext: function(url, context){
//			if (context != null && context.length > 0){
//				for (var key in context) {
//					url +=  context[key] + '/';
//				}
//			}
//			return url;
//		},
		
//		_raw: function(url, requestType, context, data, success, failure){
//			//TODO $.mobile.allowCrossDomainPages = true; un - comment code
//		    //$.support.cors = true;
//		    
//			url = this._addContext(url, context);
//			if (data == null){
//				data = {};
//			}
//			console.log(url);
//			data.accessKey = this.accessKey;
		
//			$.ajax({

//				url: url,
//				type: requestType,
//				data: data,
//				dataType: "json",
//				async: true,
//				crossDomain  : true,
//				success: function(response){
//					success(response);
//				},
//				error: function(a, b, c){
//					console.log(JSON.stringify(a) + " - " + JSON.stringify(b) + " - " + JSON.stringify(c));
//					 failure(a);
//				}
//			});
//		},
//		_rawPostFile: function (url, requestType, context, data, success, failure) {
//		    $.support.cors = true;
//		    url = this._addContext(url, context);
//		    if (data == null) {
//		        data = {};
//		    }
//		    $.ajax({
//		        url: url,
//		        type: requestType,
//		        crossDomain: true,
//		        contentType: false,
//		        processData: false,
//		        dataType: 'json',
//		        data: data,
//		        async: true,
//		        cache: false,
//		        success: function (response) {
//		            success(response);
//		        },
//		        error: function (a, b, c) {
//		            if (failure) failure(angel);
//		        }
//		    });
//		},
//		post : function(restClass, context, data, success, failure){
//			this._raw(this._defaultServer, 'POST', context, data, success, failure);
//		},
//		postFile : function(restClass, context, data, success, failure){
//		    this._rawPostFile(this._defaultServer, 'POST', context, data, success, failure);
//		},
//		put : function(restClass, context, data, success, failure){
//			this._raw(this._defaultServer, 'POST', context, data, success, failure);
//		},
		
//		remove : function(restClass, context, data, success, failure){
//			this._raw(this._defaultServer, 'DELETE', context, data, success, failure);
//		},
		
//		get: function(restClass, context, data, success, failure){
//			this._raw(this._defaultServer, 'GET', context, data, success, failure);
//		},
		
		
//};

