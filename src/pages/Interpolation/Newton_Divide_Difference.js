import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';


const InputStyle = {
    background: "while",
    color: "#922B21",
    fontWeight: "bold",
    fontSize: "24px"

};

var columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];
var x, y, tableTag, interpolatePoint, tempTag, fx


class Newton_Divide_Difference extends Component {
    constructor() {
        super();
        x = []
        y = []
        interpolatePoint = []
        tempTag = []
        tableTag = []
        this.state = {
            nPoints: 0,
            X: 0,
            interpolatePoint: 0,
            showInputForm: true,
            showTableInput: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.newton_difference = this.newton_difference.bind(this);

    }
    createTableInput(n) {
        for (var i = 1; i <= n; i++) {
            x.push(<Input style={{ //แถบสีใส่ตัวเลขของ x,y
                width: "100%",
                height: "50%",
                backgroundColor: "#642ab5",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"x" + i} key={"x" + i} placeholder={"x" + i} />);
            y.push(<Input style={{
                width: "100%",
                height: "50%",
                backgroundColor: "#2b4acb",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"y" + i} key={"y" + i} placeholder={"y" + i} />);
            tableTag.push({
                no: i,
                x: x[i - 1],
                y: y[i - 1]
            });
        }


        this.setState({
            showInputForm: false,
            showTableInput: true,
        })
    }
    createInterpolatePointInput() {
        for (var i = 1; i <= this.state.interpolatePoint; i++) {
            tempTag.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor: "while", //ปุ่มp1,p2,p3
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "#922B21", //สีตัวเลข
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"p" + i} key={"p" + i} placeholder={"p" + i} />)
        }
    }
    initialValue() {
        x = []
        y = []
        for (var i = 1; i <= this.state.nPoints; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
        for (i = 1; i <= this.state.interpolatePoint; i++) {
            interpolatePoint[i] = parseInt(document.getElementById("p" + i).value);
        }
    }
    C(n) {
        if (n === 1) {
            return 0
        }
        else {
            return ((y[interpolatePoint[n]] - y[interpolatePoint[n - 1]]) / (x[interpolatePoint[n]] - x[interpolatePoint[n - 1]])) - this.C(n - 1)
        }

    }
    findX(n, X) {
        if (n < 1) {
            return 1
        }
        else {
            console.log(X + " - " + x[interpolatePoint[n]])
            return (X - x[interpolatePoint[n]]) * this.findX(n - 1, X)
        }
    }
    newton_difference(n, X) {
        this.initialValue()
        fx = y[1]
        if (n === 2) { //if linear interpolate
            fx += ((y[interpolatePoint[2]] - y[interpolatePoint[1]]) / (x[interpolatePoint[2]] - x[interpolatePoint[1]])) * (X - x[interpolatePoint[1]])
        }
        else {
            for (var i = 2; i <= n; i++) {
                fx += (this.C(i) / (x[interpolatePoint[i]] - x[interpolatePoint[1]])) * this.findX(i - 1, X)
            }
        }

        this.setState({
            showOutputCard: true
        })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ padding: "60px" }}>
                <h2 style={{ color: "#f89f9a", fontWeight: "bold" }}>Newton's Divided Differences Interpolation</h2>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "#f89f9a", borderRadius:"30px", color: "#" }} //backgroundที่คำนวณ
                            onChange={this.handleChange}
                        >
                            {this.state.showTableInput &&
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "white", overflowY: "scroll", minWidth: 120, maxHeight: 300 }}></Table>
                                    <br /><h2>interpolatePoint {parseInt(this.state.interpolatePoint) === 2 ? "(Linear)" :
                                        parseInt(this.state.interpolatePoint) === 3 ? "(Quadratic)" :
                                            "(Polynomial)"}</h2>{tempTag}

                                    <Button //ปุ่มsubmit
                                        id="matrix_button" 
                                        style={{ background: "while", color: "#D68910"}}
                                        onClick={() => this.newton_difference(parseInt(this.state.interpolatePoint), parseFloat(this.state.X))}>
                                        Submit
                                </Button>
                                </div>}

                            {this.state.showInputForm &&
                                <div>
                                    <h2>Number of points(n)</h2><Input size="large" name="nPoints" style={InputStyle}></Input>
                                    <h2>X</h2><Input size="large" name="X" style={InputStyle}></Input>
                                    <h2>interpolatePoint</h2><Input size="large" name="interpolatePoint" style={InputStyle}></Input>
                                    <Button id="dimention_button" onClick={
                                        () => {
                                            this.createTableInput(parseInt(this.state.nPoints));
                                            this.createInterpolatePointInput()
                                        }
                                    }
                                        style={{ background: "while", color: "#f37370" , fontSize: "15px",marginLeft: "40%" }}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"} //output
                                bordered={true}
                                style={{ border: "2px solid black", background: "#f89f9a", color: "white" }}
                            >
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{fx}</p>

                            </Card>
                        }
                    </div>

                </div>


            </div>
        );
    }
}
export default Newton_Divide_Difference;

