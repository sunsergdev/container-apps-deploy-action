import * as os from 'os';
import { Utility } from './Utility';
import { GitHubActionsToolHelper } from './GitHubActionsToolHelper';

const toolHelper = new GitHubActionsToolHelper();
const util = new Utility();

export class AddOnServicesHelper {

    /**
     * Creates or updates an add-on service.
     * @param addOnType - the type of the add-on service. This could be one of the following: 
     * kafka, redis, postres, qrant, mariadb, milvus, and weaviate.
     * @param serviceName - the name of the add-on service
     * @param resourceGroup - the name of the resource group to use for the task.
     * @param environment - the Container App Environment that will be associated with the add-on
     */
    public async createAddOnService(addOnType: string, serviceName: string, resourceGroup: string, environment: string) {
        toolHelper.writeDebug(`Attempting to create a ${addOnType} binding service ${serviceName}`)
        try {
            await util.execute(`az containerapp add-on ${addOnType} create --name ${serviceName} --environment ${environment} --resource-group ${resourceGroup}`)
        } catch (err) {
            toolHelper.writeError(`Failed to create add-on binding ${serviceName} in resource group ${resourceGroup} and environment ${environment}`);
            throw err;
        }
    }
}