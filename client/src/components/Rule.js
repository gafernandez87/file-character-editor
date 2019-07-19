import React from 'react';
import { Form, Input, Icon } from 'antd';

function Rule(props) {
    const {id, name, col, row, value} = props.rule

    return (
        <div>
            <Form.Item label="Nombre">
                <Input type="text" value={name} onChange={(e) => props.changeRuleField(id, "name", e.target.value)} />
            </Form.Item>
            <Form.Item label="Fila">
                <Input type="text" value={row} onChange={(e) => props.changeRuleField(id, "row", e.target.value)} />
            </Form.Item>

            <Form.Item   label="Posicion">
                <Input type="text" value={col} onChange={(e) => props.changeRuleField(id, "col", e.target.value)} />
            </Form.Item>
            <Form.Item  label="Valor">
                <Input type="text" value={value} onChange={(e) => props.changeRuleField(id, "value", e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    style={{"fontSize": "18px", "color": "red"}}
                    onClick={() => props.onDelete(id)}
                />
            </Form.Item>
        </div>
    )
}

export default Rule; 