import React from 'react';
import Rule from './Rule';
import { Form, Button, Icon } from 'antd';

const defaultRule = {
    name: "",
    row: "",
    col: "",
    value: ""
}

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            ruleList: [
                {
                    id: 0,
                    name: "ID",
                    row: "0",
                    col: "0-4",
                    value: "X  X"
                },
                {
                    id: 1,
                    name: "Nombre",
                    row: "1",
                    col: "1",
                    value: "A"
                }
            ],
            rowList: [] ,
            hiddenDownloadBtn: true
        };
    }

    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.readAsText(e.target.files[0])
        reader.onload = async (e) => { 
            const text = (e.target.result)
            let newRowList = [];
            let newLine = '';
            for(let i = 0; i < text.length; i++){
                if(text[i] === "\n"){
                    newRowList.push(newLine);
                    newLine = '';
                }else{
                    newLine += text[i]
                }
            }
            newRowList.push(newLine);
            this.setState({rowList: newRowList, hiddenDownloadBtn: false});
        };
    }

    addRule = () => {
        let ruleList = [...this.state.ruleList]
        let newRule = {...defaultRule}
        newRule.id = ruleList[ruleList.length-1].id+1;
        ruleList.push(newRule);
        this.setState({ruleList})
    }

    deleteRule = (ruleId) => {
        const ruleList = this.state.ruleList.filter(rule => rule.id !== ruleId);
        this.setState({ruleList})
    }

    applyRules = () => {
        const ruleList = [...this.state.ruleList]; //All rules
        let oldRow,newRow,rangeFrom,rangeTo;    //initiate variables
        let rowList = [...this.state.rowList];  //All the rows of the txt

        for(let i = 0; i < ruleList.length; i++){
            const { row, col, value } = ruleList[i];
            oldRow = rowList[row];
            newRow = []
            const ruleType = col.indexOf("-") >= 0 ? "RANGE" : "SINGLE";
            rangeFrom = ruleType === "RANGE" ? parseInt(col[0]) : -1
            rangeTo = ruleType === "RANGE" ? parseInt(col[2]) : -1

            switch(ruleType){
                case "RANGE":
                    newRow = [oldRow.slice(0, rangeFrom), value, oldRow.slice(rangeTo+1)].join("");
                    break;
                default:
                    newRow = [oldRow.slice(0, parseInt(col)), value, oldRow.slice(parseInt(col)+1)].join("");                        
                    break;
            }

            rowList[row] = newRow;
        }
        
        this.setState({rowList});
    }

    changeRuleField = (ruleId, fieldName, value) => {
        let ruleList = this.state.ruleList
        ruleList = ruleList.map(rule => {
            if(rule.id === ruleId){
                rule[fieldName] = value;
            }
            return rule;
        });
        this.setState({ruleList})
    }

    downloadTxtFile = () => {
        const file = new Blob([this.state.rowList.join('\n')], {type: 'text/plain'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        element.click();
    }

    fakeFileInputClick = (_) => {
        
        this.fileInput.click();
    }

    render() {
        const style= {
            margin: "0 auto",
            width: "500px"
        }

        const divStyle = {
            "marginBottom": "40px"
        }
        return (
            <div style={{padding: "10px"}}>
                <div style={divStyle}>
                    Archivo que se va a editar <Button onClick={this.fakeFileInputClick}>Upload a file <Icon type="upload" /></Button>
                    <input type="file" hidden ref={input => this.fileInput = input} onChange={(e) => this.showFile(e)} />
                </div>
                <div style={divStyle}>
                    <Form onSubmit={this.handleSubmit} layout="inline">
                        {this.state.ruleList.map( (rule,i) => 
                            <Rule key={i} 
                                rule={rule} 
                                changeRuleField={this.changeRuleField} 
                                onDelete={this.deleteRule}/> 
                        )}
                    </Form>
                
                    <Button type="dashed" onClick={this.addRule} style={{"margin": "20px 0 0 5px"}}><Icon type="plus"/>Agregar regla</Button>
                    <Button type="primary" onClick={this.applyRules} style={{float: "right", "margin": "20px 20% 0 0"}}>Aplicar reglas</Button>
                </div>
                <div style={divStyle}>
                    {this.state.rowList.map( (p,i) => <p key={i} style={style}>{p}</p>)}
                </div>

                <div>
                    <Button onClick={this.downloadTxtFile} hidden={this.state.hiddenDownloadBtn}>Descargar archivo</Button>
                </div>
            </div>
        );
    }
}

export default Main;