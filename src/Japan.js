import React, { Component } from 'react';
import Thanhpho from './Thanhpho';

class Japan extends Component {
    constructor(props){
        super(props);
        this.state = {
            reponse : {
                "message": null,
                "result": [{
                    "prefCode": 1,
                    "prefName": "北海道"
                }],
            },
        }
    }

    
    componentDidMount() {
        fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures",{
            headers: { "X-API-KEY": "4ibUag7YlO6BYEnMKLTUNRNbwoI2P7i5PgBmJ1G2"},
        })
        .then(res => res.json())
        .then(
            result => {this.setState({reponse : result})},
        )
    }

    handleChange = (data,danso,check) => {
        this.props.onHandleChange(data,danso,check);
    }

    handleChangeThanhPho = (check) => {
        this.props.onHandleChangeThanhPho(check);
    }

    render() {
        return (
            <div className="checkbox">
                <h1 className='h1allthanhpho'>都市を選択してください</h1>
                <div className="allThanhPho">
                    {this.state.reponse.result.map((item,index) => {
                        return <Thanhpho onHandleChange={this.handleChange} onHandleChangeThanhPho={this.handleChangeThanhPho} index={item.prefCode} key={index}>{item.prefName}</Thanhpho>
                    })}
                </div>
            </div>
        );
    }
}

export default Japan;