({
    doInit: function (component, event, helper) {
    	helper.loadRouteOptions(component); //load routes
		helper.setupInitialData(component); //setup initial state
    },

    handleRouteChange: function (component, event, helper) {
    	var routeSelection = component.get("v.routeSelectedId");
    	var routeOptions = component.get("v.routeOptions");

    	//set route name
    	for(var i in routeOptions) {
    		if(routeOptions[i].value == component.get("v.routeSelectedId"))
    		component.set("v.routeSelectedName", routeOptions[i].label);
    	}
    	
    	//get runsheets
    	helper.loadRunsheetsForRoute(component, routeSelection);

    	//show table
    	if(routeSelection != null) component.set("v.isRouteSelected", true);
    },
    
    toggleSpinner: function (component) {
        // var spinner = component.find("loadingSpinner");
        // $A.util.toggleClass(spinner, "slds-hide");
    }
})