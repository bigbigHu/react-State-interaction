import React, { Component } from 'react';

class ControlPanel extends Component {
  constructor (props) {
    super(props);
    this.getSum = this.getSum.bind(this);
    this.change = this.change.bind(this);
    this.state = {
      sum: 30,
      text: '父组件默认状态',
    }
  }
  getSum (count,oldCount) {
    console.log(this);
    let Increment = count - oldCount;
    this.setState({
      sum: this.state.sum + Increment,
    })
  }

  change (t) {
    console.log(t);
    this.setState({
      text: t,
    })
  }

  render () {
    return (
      <div>
        <Counter onChange={this.change} onUpdate={this.getSum} caption="First" initValue={0} />
        <Counter onUpdate={this.getSum} caption="Second" initValue={10} />
        <Counter onUpdate={this.getSum} caption="Third" initValue={20} />
        <h3 style={{ marginTop: '30px' }}>sum: {this.state.sum}</h3>
      </div>
    );
  }
}

class Counter extends Component {
  constructor (props) {
    super(props);
    this.add = this.add.bind(this);
    this.less = this.less.bind(this);
    this.state = {
      count: props.initValue,
    }
  }

  shouldComponentUpdate (nextProp,nextState) {
    if(nextState.count === this.state.count){
      return false;
    }
    return true;
  }

  add () {
    this.trigger(true);
  }

  less () {
    this.trigger(false);
  }

  trigger (action) {
    let num = action?this.state.count + 1:this.state.count - 1;
    this.setState({
      count: num,
    });
    this.props.onUpdate(num,this.state.count);
    if(this.props.onChange){
      this.props.onChange('父组件被更新了');
    }
  }

  render () {
    let { caption } = this.props;
    return (
      <div style={{marginTop: '30px'}}>
        <button onClick={this.add} style={{ color: "red", marginRight: '5px' }}>+</button>
        <button onClick={this.less} style={{ color: "blue", marginRight: '5px' }}>-</button>
        <span>{caption} count:{this.state.count}</span>
      </div>
    );
  }
}

export default ControlPanel;