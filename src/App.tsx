import React, {DragEvent} from 'react';
import './App.module.css';
import style from './App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./redux/store";
import {
    CanvasItemType,
    deleteFigure,
    ItemType
} from "./redux/DnDReducer";
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

    const deleteCanvasFigureOutsideCanvas = () => {
        dispatch(deleteFigure(canvasFigureId))
    }

    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div className={style.app} onDragOver={onDragOverHandler} onDrop={deleteCanvasFigureOutsideCanvas}>
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








