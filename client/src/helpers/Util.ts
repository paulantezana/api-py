import { MenuProps } from "antd";

export default class Util {
    static actionsToMenu = (actions: Record<string, any>[]): MenuProps['items'] => {

        const treeMenu: MenuProps['items'] = actions.map((item) => ({ key: item.id, label: item.title, title: item.description }))

        return treeMenu;
    }

    /**
     * Convierte un array en un array tipo arbol
     * @param items listados de objetos
     * @param id identificador unico de cada item
     * @param link campo que identifica al padre
     * @param callBack alguna funcion a ejecutarse en cada elemento del item
     * @returns retorna un array de tipo arbol
     */
    static arrayToTree = (
        items: any[],
        id: string,
        link: string = 'parent_id',
        callBack: ((item: any) => any) | null = null
    ): any[] => {
        const newItems = items.filter(
            (item) => String(item[link]) === String(id)
        );
        const tree = newItems.map((item) => {
            const children = Util.arrayToTree(items, item.id, link, callBack);

            if (typeof callBack === 'function') {
                return children.length > 0
                    ? { ...callBack(item), children }
                    : callBack(item);
            }

            return children.length > 0 ? { ...item, children } : item;
        });
        return tree;
    };
}