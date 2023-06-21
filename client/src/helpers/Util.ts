import { MenuProps } from "antd";

export default class Util {
    static actionsToMenu = (actions: Record<string, any>[]): MenuProps['items'] => {

        const treeMenu: MenuProps['items'] = actions.map((item) => ({ key: item.id, label: item.title, title: item.description }))

        return treeMenu;
    }
}