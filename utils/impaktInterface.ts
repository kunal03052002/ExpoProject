export interface Request {
    kind: string;
 }
  
 export interface Response {
    kind: string;
 }

 
  
 /*
    Get Resources Request
 */
 export interface ResourcesRequest extends Request {
    kind: 'GetResources';
 }
  
 export interface ResourcesResponse extends Response {
    kind: 'GetResources';
    resources: Resource[];
 }
 /*
    Get Rules Request
 */
 export interface RulesRequest extends Request {
    kind: 'GetRules';
    resource: Resource;
 }
  
 export interface RulesResponse extends Response {
    kind: 'GetRules';
    rules: string[];
 }
  
 export interface Resource {
    groupName: string;
    artifactName: string;
    version: string;
 }

 export function isRulesRequest(request: Request): request is RulesRequest {
    return request.kind === 'GetRules';
 }
  
 export function isResourcesRequest(request: Request): request is ResourcesRequest {
    return request.kind === 'GetResources';
 }
  
  