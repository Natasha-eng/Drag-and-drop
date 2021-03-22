import {addFigure, CanvasItemType, changeCopyStatus} from "../redux/DnDReducer";
import {useDispatch, useSelector} from "react-redux";
import React, {DragEvent} from "react";
import style from "../App.module.css";
import {CanvasFigure} from "./CanvasFigure";
import {RootStateType} from "../redux/store";


type CanvasFieldPropsType = {
    items: Array<CanvasItemType>
    title: string
}

export const CanvasField = React.memo(({items, title}: CanvasFieldPropsType) => {
    const dispatch = useDispatch()
    const copyStatus = useSelector<RootStateType, boolean>(state => state.dndFigures.createCopy)

    const addFigureOnDropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!copyStatus) {
            return
        }
        dispatch(addFigure())
    }

    const changeCopyStatusHandler = () => {
        dispatch(changeCopyStatus(false))
    }

    return (
        <div className={style.canvasField} onDrop={addFigureOnDropHandler} onDragStart={changeCopyStatusHandler}>
            <h1 className={style.fieldTitle}>{title}</h1>
            <div className={style.figureWrapper}>
                {items.map(i => <CanvasFigure item={i}/>)}
            </div>

        </div>
    )
})