class TableHeader():

    def __init__(self, id, field_name, field_title, filterable, sortable, visible, col_index) -> None:
        self.id = id
        self.field_name = field_name
        self.field_title = field_title
        self.filterable = filterable
        self.sortable = sortable
        self.visible = visible
        self.col_index = col_index

    def to_JSON(self):
        return {
            'id': self.id,
            'field_name': self.field_name,
            'field_title': self.field_title,
            'filterable': self.filterable,
            'sortable': self.sortable,
            'visible': self.visible,
            'col_index': self.col_index,
        }
