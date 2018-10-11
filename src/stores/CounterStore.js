import AppDispatcher from '../AppDispatcher';
import * as ActionTypes from '../ActionTypes';
import { EventEmitter } from 'events';

const counterValues = {
    'First': 0,
    'Second': 10,
    'Third': 20,
};

const CANGEEVENT = 'change';

const CounterStore = Object.assign({},EventEmitter.prototype,{
    getCounterValue: () => counterValues,

    emitChange: function(){
        this.emit(CANGEEVENT)
    },
    addChangeListener: function(callback){
        this.on(CANGEEVENT, callback)
    },
    removeChangeListener: function(callback){
        this.removeListener(CANGEEVENT, callback)
    }
})
CounterStore.dispatcher = AppDispatcher.register((action) => {
    if(action.type === ActionTypes.INCREMENT){
        counterValues[action.counterCaption] ++;
        CounterStore.emitChange();
    }else if(action.type === ActionTypes.DECREMENT){
        counterValues[action.counterCaption] --;
        CounterStore.emitChange();
    }
})
export default CounterStore;