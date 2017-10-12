({
	setupInitialData: function (component) {
        component.set("v.isRouteSelected", false);
        var today = new Date();
        component.set("v.currentDate", today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate())
    },

    loadRouteOptions: function (component) {
    	var action = component.get("c.getRouteList");
    	action.setCallback(this, function(response) {
    		var state = response.getState();
            if (state === "SUCCESS") {
                var returnValue = response.getReturnValue();
                var opts = [{value: "", label: "-- Select Route --"}];

                for(var i in returnValue) {
				    if (returnValue.hasOwnProperty(i)) {
				        //console.log('Key is: ' + i + ', Value is: ' + returnValue[i]);
				        opts.push({value: returnValue[i], label: i});
				    }
				}
				component.set("v.routeOptions", opts);
            }
            else if (state === "INCOMPLETE") {
               
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
    	});

    	$A.enqueueAction(action);
    },

    loadRunsheetsForRoute: function (component, selectedRouteId) {
        var action = component.get("c.getRunsheetsForRoute");
        action.setParams({routeId : selectedRouteId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnValue = response.getReturnValue();
                component.set("v.runsheetData", returnValue);
            }
            else if (state === "INCOMPLETE") {
               
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);
    }
})