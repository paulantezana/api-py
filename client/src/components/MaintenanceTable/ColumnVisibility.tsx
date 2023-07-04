
import { Button, Space, Switch } from 'antd';
import { Table } from '@tanstack/react-table'

const ColumnVisibility = ({ table }: { table: Table<Record<string, any>> }) => {
  return (<Space direction={'vertical'}>
    <div style={{ maxHeight: '10rem', overflow: 'auto' }}>
      {table.getAllLeafColumns().map(column => {
        return (
          <div key={column.id} className="px-1">
            <label>
              <Space>
                <Switch size={'small'} checked={column.getIsVisible()} defaultChecked onChange={(checked: boolean)=>column.toggleVisibility(checked)} />
                <span>{column.id}</span>
              </Space>
            </label>
          </div>
        )
      })}
    </div>
    <Space>
      <Button size='small' disabled={!table.getIsSomeColumnsVisible()} onClick={()=> table.toggleAllColumnsVisible(false) } >Ocultar todo</Button>
      <Button size='small' disabled={table.getIsAllColumnsVisible()} onClick={()=> table.toggleAllColumnsVisible(true) } >Mostrar todo</Button>
    </Space>
  </Space>)
}

export default ColumnVisibility;