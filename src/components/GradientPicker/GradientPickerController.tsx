/**
 * component:
 *    Stage (展台)
 *    OperationGroup (移动)
 *        OperationItem (位置, 颜色)
 */
import React, { useReducer, useCallback, useEffect, useMemo } from 'react';
import Operaition from './Operaition';
import { Stop } from './type';
import uuid from 'uuid';

function formatValue(stops: Stop[]) {
  const _stops = stops.map(stop => ({
    id: uuid(),
    ...stop,
  }));
  return _stops.reduce((_: any, stop) => {
    _[stop.id] = stop;
    return _;
  }, {});
}

enum ActionType {
  updateStop,
  addStop,
  deleteStop,
}

interface GradientPickerControllerProps{
  value: Stop[];
  onChange?: (v: Stop[]) => void;
}

const GradientPickerController: React.FunctionComponent<GradientPickerControllerProps> = ({value, onChange}) => {
  const [_stops, dispatch] = useReducer((state, action) => {
    console.log('reducer-log:', action, state);
    switch(action.type) {
      case ActionType.updateStop:
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload,
          }
        };
      case ActionType.addStop: {
        const id = uuid();
        return {
          ...state,
          [id]: {
            id,
            color: {r: 0, g: 0, b: 0, a: 1},
            position: 0,
            ...action.payload,
          },
        };
      }
      case ActionType.deleteStop: {
        Reflect.deleteProperty(state, action.payload.id);
        console.log(state, action.payload)
        return {
          ...state,
        }
      }
      default: return state;
    }
  }, formatValue(value));
  const stops = useMemo(() => {
    const arr =  Object.keys(_stops).map(key => _stops[key]);
    const ascendStops = arr.sort((prev, next) => prev.position - next.position);
    console.log('asStops:', ascendStops);
    return ascendStops;
  }, [_stops]);

  useEffect(() => {
    onChange && onChange(stops);
  }, [stops, onChange]);

  const onSpawn = useCallback((payload) => {
    dispatch({type: ActionType.addStop, payload});
  }, [dispatch]);

  return (
    <div>
      <Operaition.Group onSpawn={onSpawn}>
        {
          stops.map(stop => (
            <Operaition.Item
              key={stop.id}
              color={stop.color}
              position={stop.position}
              onChange={payload => dispatch({type: ActionType.updateStop, payload: {id: stop.id, ...payload}})}
              onDelete={() =>  dispatch({type: ActionType.deleteStop, payload: {id: stop.id}})}
              canDelete={stops.length > 2}
            ></Operaition.Item>
          ))
        }
      </Operaition.Group>
    </div>
  )
}

export default GradientPickerController;