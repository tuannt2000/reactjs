import React, { Component } from 'react';
import Tinh from './Tinh';

class Thanhpho extends Component {
    constructor(props){
        super(props);
        this.state = {
            reponse : {
                "message": null,
                "result": [{
                    "prefCode": 1,
                    "cityCode": "01100",
                    "cityName": "札幌市",
                    "bigCityFlag": "2"
                }, {
                    "prefCode": 1,
                    "cityCode": "01101",
                    "cityName": "札幌市中央区",
                    "bigCityFlag": "1"
                }],
            },
            "check" : false,
        }
    }

    componentDidMount() {
        fetch("https://opendata.resas-portal.go.jp/api/v1/cities?prefCode="+this.props.index,{
            headers: { "X-API-KEY": "OjcxJFvwkyY1rhDLOIlmIw1HzZltAoj0XBgsbd2C" },
        })
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                reponse : result
            });
            },
        )
    }

    SetCheck(){
        if(this.state.check === true){
            this.setState({check : false})
        }else{
            this.setState({check : true})
        }
    }

    handleChange = (data,danso,check) =>{
        this.props.onHandleChange(data,danso,check)
    }

    show = () => {
        if(this.state.check === true){
            return <div>
                <h2>人口を見たい地区、州を選択してください</h2>
                <div className="alltinh">
                    {this.state.reponse.result.map((item,index)=>{
                        return <Tinh onHandleChange={this.handleChange} prefCode={this.props.index} key={index} index={item.cityCode}>{item.cityName}</Tinh>
                    })}
                </div>
            </div>
        }
    }

    render() {
        return (
            <div className={"thanhpho " + this.props.index}>
                <input onChange={() => {
                    this.SetCheck(); 
                    this.props.onHandleChangeThanhPho(this.state.check);
                    var thanhpho = document.querySelectorAll('.thanhpho');
                    if(this.state.check === false){
                        for(var value of thanhpho){
                            if(value === thanhpho[this.props.index-1]){
                                value.style.display = 'block';
                            }else{
                                value.style.display = 'none';
                            }
                        }
                        document.querySelector('.allThanhPho').style.display = 'block';
                        document.querySelector('.h1allthanhpho').innerHTML = 'あなたが選択しました : ' + this.props.children
                    }else{
                        for(var value2 of thanhpho){
                            value2.style.display = 'block';
                        }
                        document.querySelector('.allThanhPho').style.display = 'grid';
                        document.querySelector('.h1allthanhpho').innerHTML = '都市を選択してください'
                    }
                }} type="checkbox"/> 
                <label>{this.props.children}</label>
                {this.show()}
            </div>
        );
    }
}

export default Thanhpho;