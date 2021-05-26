import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import { det } from 'mathjs';
import 'antd/dist/antd.css';
import apis from '../API/index'

const InputStyle = {
    background: "while",
    color: "#922B21 ",
    fontWeight: "bold",
    fontSize: "24px"

};


var A = [], B = [], answer = [], matrixA = [], matrixB = []
class Cramer extends Component {

    constructor() {
        super();
        this.state = {
            apiData:[],
            row: parseInt(0),
            column: parseInt(0),
            matrixA: [[null,null,null],[null,null,null],[null,null,null]],
            matrixB: [null,null,null],
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.cramer = this.cramer.bind(this);

    }

    //ดึงโจทย์
    async getData(){
        let tempData = null
        await apis.getAllMatrix().then(res => {tempData = res.data})
        console.log(tempData)
        this.setState({apiData:tempData})
        this.setState({
            row: this.state.apiData[0]["Row"],
            column :this.state.apiData[0]["Column"],
            matrixA :this.state.apiData[0]["matrixA"],
            matrixB :this.state.apiData[0]["matrixB"],
            error: this.state.apiData[0]["error"],
        })
    }
    onClickExample = e =>{
        this.getData()
    }


    cramer() {
        this.initMatrix();
        var counter = 0;
        
        while (counter != this.state.row) {
            console.log(A)

            var transformMatrix = JSON.parse(JSON.stringify(A)); //matrix ตั้งต้น
            console.log(JSON.parse(JSON.stringify(A)))

            {/*MatrixA เปลี่ยนแถวที่1 ให้เป็น atrixB*/}
            for (var i = 0; i < this.state.row; i++) {
                for (var j = 0; j < this.state.column; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }

                }

            }
            counter++;
            console.log(transformMatrix)
            console.log(Math.round(det(transformMatrix)) / Math.round(det(A)))  

            {/*เอาdet ที่เปลี่ยนรูปแล้ว มาหารกับdet รูปแบบเดิม */}
            answer.push(<h2>X<sub>{counter}</sub>={Math.round(det(transformMatrix)) / Math.round(det(A))}</h2>)
            answer.push(<br />)

        }
        this.setState({
            showOutputCard: true
        });

    }

    createMatrix(row, column) {
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input  style={{
                    width: "18%",
                    height: "50%",
                    backgroundColor: "#",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "#922B21",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} value={this.state.matrixA[i-1][j-1]}

                    id={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "#",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "#922B21",
                fontSize: "18px",
                fontWeight: "bold",
                
            }} value={this.state.matrixB[i-1]}

                id={"b" + i} placeholder={"b" + i} />)
                
        }

        this.setState({
            showDimentionForm: false,
            showMatrixForm: true,
        })


    }

    //function matrix เริ่มต้น
    initMatrix() {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        let { row, column } = this.state;
        return (
            <div style={{ background: "#", padding: "30px" , width: '100%'}}>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "#f89f9a", color: "#FFFFFFFF", width: '100%'}}
                            onChange={this.handleChange}
                        >

                            {this.state.showDimentionForm &&
                                <div>
                                    <h2>Row</h2><Input size="large" name="row" style={InputStyle} ></Input>
                                    
                                    <h2>Column</h2><Input size="large" name="column" style={InputStyle} ></Input><br /><br />
                                    <Button id="dimention_button" onClick={() => this.createMatrix(row,column)}
                                        style={{ color: "#D68910", fontSize: "15px", marginLeft: "20"  }}>
                                        Submit
                                    </Button>
                                    {/*API */}
                        <br /><br />
                        {/* <Button id="API" onClick={() => this.getData()}
                            style={{ color: "#D68910", fontSize: "15px", marginLeft: "20" }}>Example <br></br></Button> */}
                                </div>
                            }
                            {this.state.showMatrixForm &&
                                <div>
                                    <h2>Matrix [A]</h2>{matrixA} <br />
                                    <h2>Vector [B]<br /></h2>{matrixB}<br/>
                                    <Button
                                        size="large"
                                        id="matrix_button"
                                        style={{color: "#D68910", fontSize: "15px", marginLeft: "20"}}onClick={() => this.cramer()}>
                                        Submit
                                </Button>
                                <br /><br />
                                <Button id="API" onClick={() => this.getData()}>Example</Button>
                                 
                                </div>
                            }



                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ background: "#f89f9a", color: "white"}}
                                onChange={this.handleChange}>
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{answer}</p>
                            </Card>
                        }
                    </div>
                </div>

            </div>
        );
    }
}
export default Cramer;

