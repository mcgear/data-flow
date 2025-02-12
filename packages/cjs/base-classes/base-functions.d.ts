import { DataFlowDataModel } from '../models/dataflow-data.model.js';
export declare abstract class BaseFunctions {
    /**
     * Set active module
     *
     * @param module module name
     * @returns active module
     */
    protected activeModule(moduleName?: string): DataFlowDataModel | any;
    protected updateConnectionNodes(id: string): void;
    protected updateConnection(eX: any, eY: any): void;
    protected getModuleFromNodeId(id: string): any;
    protected removeConnection(): void;
    protected removeConnectionNodeId(id: any): void;
    protected removeNodeId(id: string): void;
    protected removeReouteConnectionSelected(): void;
    protected contextmenuDel(): void;
    protected getNodeFromId(id: any): any;
    removeReroutePoint(ele: any): void;
    createReroutePoint(ele: any): void;
    protected getNodesFromName(name: any): Array<any>;
    Dispatch(event: any, details: any): any;
    Remove_Event(ev: any): void;
    Zoom_Refresh(): void;
    Zoom_In(): void;
    Zoom_Out(): void;
    Zoom_Reset(): void;
}
