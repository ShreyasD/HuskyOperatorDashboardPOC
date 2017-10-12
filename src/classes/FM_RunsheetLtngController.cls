public with sharing class FM_RunsheetLtngController {
	@AuraEnabled
	public static Map<String, String> getRouteList() {
		List<Equipment_Tank__c> lAllRoutes = [SELECT Equipment__r.Location__r.Route__r.Id, Equipment__r.Location__r.Route__r.Name, Equipment__c
                                              FROM Equipment_Tank__c
                                              WHERE Equipment__r.Location__r.Route__r.Fluid_Management__c = true
                                              AND Equipment__r.Location__r.Functional_Location_Category__c IN :FM_Utilities.RUNSHEET_FUNCTIONAL_LOCATION_CATEGORIES
                                              AND Equipment__r.Location__r.Status__c IN :FM_Utilities.RUNSHEET_WELL_INCLUDED_STATUSES
                                              AND Equipment__r.Location__r.Well_Type__c IN :FM_Utilities.RUNSHEET_WELL_TYPES];
        Set<Id> setRoutes = new Set<Id>();
        Map<String, String> routeOptions = new Map<String, String>();

        for(Equipment_Tank__c oOneRoute : lAllRoutes)
        {
            if(!setRoutes.contains(oOneRoute.Equipment__r.Location__r.Route__r.Id))
            {
                routeOptions.put(oOneRoute.Equipment__r.Location__r.Route__r.Name, oOneRoute.Equipment__r.Location__r.Route__r.Id);
                setRoutes.add(oOneRoute.Equipment__r.Location__r.Route__r.Id);
            }
        }

        return routeOptions;
	}

  @AuraEnabled
  public static List<FM_Run_Sheet__c> getRunsheetsForRoute(String routeId) {
    return [Select Id, Name, Well__r.Name, Well__r.Location_Name_for_Fluid__c, 
                   Act_Flow_Rate__c, Flowline_Volume__c, Sour__c, RM_County__c, 
                   Unit_Configuration__c, Tonight_Oil__c, Tonight_Water__c, 
                   Tomorrow_Oil__c, Tomorrow_Water__c
            From FM_Run_Sheet__c
            Where Date__c = TODAY
            And Well__c != null
            And Well__r.Route__c =: routeId];
  }
}