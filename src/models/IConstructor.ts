export default interface IConstructor<T> extends Function {
    new (...args: any[]): T;
}
