export interface DataEntity {
  getUpdate(): any;
  getCreate(): any;
  getNested(): Promise<any>;
}
