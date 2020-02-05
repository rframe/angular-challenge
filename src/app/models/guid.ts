// http://stackoverflow.com/questions/26501688/a-typescript-guid-class
export class Guid {
  static readonly empty = '00000000-0000-0000-0000-000000000000';

  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
      return v.toString(16);
    });
  }
}
