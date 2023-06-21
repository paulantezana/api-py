import { Menu } from "antd";
import Util from "helpers/Util";

interface ToolbarActionProps {
    items: any
    onClick: any,
}

const ToolbarAction = ({ items, onClick } : ToolbarActionProps) => {
    return (
      <Menu items={Util.actionsToMenu(items)} onClick={onClick} mode="horizontal" />
    );
  };

  export default ToolbarAction;