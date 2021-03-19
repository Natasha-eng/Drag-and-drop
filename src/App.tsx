import React, {DragEvent, MouseEvent} from 'react';
import './App.module.css';
import style from './App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./redux/store";
import {
    addFigure,
    CanvasItemType,
    changeCanvasStatus,
    changeFigureStyle, chooseFigure, deleteFigure,
    dragStarted,
    ItemType
} from "./redux/DnDReducer";
import {DndFigure} from "./components/DndFigure";
import {CanvasField} from "./components/CanvasField";
import {Field} from "./components/Field";

function App() {
    const figures = useSelector<RootStateType, Array<ItemType>>(state => state.dndFigures.items)
    const canvasItems = useSelector<RootStateType, Array<CanvasItemType>>(state => state.dndFigures.canvasItems)
    const canvasFigureId = useSelector<RootStateType, string>(state => state.dndFigures.canvasFigureId)

    const dispatch = useDispatch()

    const deleteItemHandler = () => {
        dispatch(deleteFigure(canvasFigureId))
    }

    return (
        <div className={style.app}>
            <button className={style.deleteButton} onClick={deleteItemHandler}>Delete Figure
            </button>
            <div className={style.fieldsContainer}>
                <Field title={'Figures'} items={figures}/>
                <CanvasField title={'Canvas'} items={canvasItems}/>
            </div>
        </div>
    );
}

export default App;








