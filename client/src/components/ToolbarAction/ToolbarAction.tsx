import { ConfigProvider, Menu, theme } from "antd";
import Util from "helpers/Util";


interface ToolbarActionProps {
    items: any
    onClick: any,
}

const ToolbarAction = ({ items, onClick } : ToolbarActionProps) => {
  const { token: { colorPrimaryHover, controlItemBgHover, controlItemBgActive }, } = theme.useToken();

    return (
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              horizontalItemHoverBg: controlItemBgActive,
              linkHoverDecoration: 'red',
            }
          }
        }}
      >
        <Menu items={Util.actionsToMenu(items)} onClick={onClick} mode="horizontal" />
      </ConfigProvider>
    );
  };

  export default ToolbarAction;