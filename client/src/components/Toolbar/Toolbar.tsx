import { useQuery } from "@tanstack/react-query"
import ToolbarAction from "components/ToolbarAction/ToolbarAction"
import RequestApi from "helpers/RequestApi";

// inferface

interface ToolbarProps {
    actions?: Record<string,any>[],
    screenId: number,
}

const getActions = async (screenId: number) => {
    const response = await RequestApi.post('/config/actions', {
      body: {
        screen_id: screenId
      }
    })
  
    return response.result;
}

const Toolbar = ({ actions = [], screenId } : ToolbarProps) => {
    const actionsQuery = useQuery({
        queryKey: ['toolbar_actions', screenId],
        queryFn: () => getActions(screenId)
    });

    const onMenuClick = (key:string, domEvent:MouseEvent) => {
        // const matchItem = customItems[key];
    
        // if (matchItem === undefined) {
        //   console.warn("Toolbar: No events were found");
        //   return;
        // }
    
        // const onClickEvent = matchItem.onClick;
        // if (typeof onClickEvent !== "function") {
        //   console.warn("Toolbar: The event is not a function");
        // }
    
        // onClickEvent(domEvent);
    };

    const actionRefactors = [...(actionsQuery.data ?? []), ...actions ]

    return (
        // <div></div>
        <ToolbarAction items={actionRefactors} onClick={onMenuClick} />
    )
}

export default Toolbar;