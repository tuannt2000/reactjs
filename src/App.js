import React, { Component } from 'react';
import Japan from './Japan';
import { Line } from "react-chartjs-2";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tinh : [],
            result : {
                data : [1000,5000,3000,2000,5467,4567,6789,2341,6789,6713,2345,5890,8909,9731],
                label : "Demo",
                borderColor: '#'+Math.floor(Math.random()*16777215).toString(16),
                fill: false
            }
        }
    }

    handleChange = (data,danso,check) => {
        var a = this.state.data;
        var b = this.state.tinh;
        if(check){
            if(this.state.data.length === 1){
                a.pop();
                this.setState({data : a})
                b.pop();
                this.setState({tinh : b})
            }else if(this.state.data.length > 1){
                var timkiem = b.indexOf(danso);
                if(timkiem === 0){
                    a.shift();
                    this.setState({data : a})
                    b.shift();
                    this.setState({tinh : b})
                }else{
                    a.splice(timkiem,timkiem);
                    this.setState({data : a})
                    b.splice(timkiem,timkiem);
                    this.setState({tinh : b})
                }
            }
        }else{
            a.push(data)
            this.setState({data : a})
            b.push(danso)
            this.setState({tinh : b})
        }
    }

    handleChangeThanhPho = (check) =>{
        var a = this.state.data;
        var b = this.state.tinh;
        if(check){
            a.splice(0,this.state.data.length);
            this.setState({data : a})
            b.splice(0,this.state.tinh.length);
            this.setState({tinh : b})
        }
    }


    DanSo(){
        var i = 0;
        var mang = [];
        if(this.state.data.length === 0){
            mang.push(this.state.result)
        }else{
            while(i < this.state.data.length){
                var a = {
                    data : [],
                    label : this.state.tinh[i],
                    borderColor: '#'+Math.floor(Math.random()*16777215).toString(16),
                    fill: false
                };
                for(var j of this.state.data[i]){
                    a.data.push(j.value)
                }
                mang.push(a);
                ++i;
            }
        }
        return mang;
    }

    render() {
        return (
            <div>
                <Japan onHandleChange={this.handleChange} onHandleChangeThanhPho = {this.handleChangeThanhPho}/>
                <Line
                    data={{
                    labels: [1980,1985,1990,1995,2000,2005,2010,2015,2020,2025,2030,2035,2040,2045],
                    datasets:  this.DanSo()
                    }}
                    options={{
                        plugins: {
                          title: {
                            display: true,
                            text: "人口チャート",
                            font: {
                                size: 30
                            }        
                          },
                          legend: {
                            display: true,
                            position: "right"
                         }
                        }
                      }}
                />
            </div>
        );
    }
}

export default App;