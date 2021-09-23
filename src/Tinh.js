import React, { Component } from 'react';

class Tinh extends Component {
    constructor(props){
        super(props);
        this.state = {
            reponse : {
                "message": null,
                "result": {
                    "boundaryYear": 2015,
                    "data": [{
                        "label": "総人口",
                        "data": [{
                            "year": 1980,
                            "value": 12817
                        }, {
                            "year": 1985,
                            "value": 12707
                        }, {
                            "year": 1990,
                            "value": 12571
                        }, {
                            "year": 1995,
                            "value": 12602
                        }],
                    }],
                },
            },
            "check" : false
        }
    }

    SetCheck(){
        if(this.state.check === true){
            this.setState({check : false})
        }else{
            this.setState({check : true})
        }
    }

    componentDidMount () {
        fetch("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode="+this.props.index+"&prefCode="+this.props.prefCode,{
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
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div className={"tinh " + this.props.index}>
                <input onChange={() => {
                    this.SetCheck();    
                    this.props.onHandleChange(this.state.reponse.result.data[0].data,this.props.children,this.state.check);           
                }} type="checkbox"/> 
                <label>{this.props.children}</label>
            </div>
        );
    }
}

export default Tinh;