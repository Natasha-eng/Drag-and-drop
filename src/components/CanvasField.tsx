import {addFigure, CanvasItemType} from "../redux/DnDReducer";
import {useDispatch} from "react-redux";
import React, {DragEvent} from "react";
import style from "../App.module.css";
import {CanvasFigure} from "./CanvasFigure";


type CanvasFieldPropsType = {
    title: string
    items: Array<CanvasItemType>
}

export const CanvasField = React.memo(({title, items}: CanvasFieldPropsType) => {
    const dispatch = useDispatch()

    const OnEndDraggingFigure = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(addFigure())
    }

    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div className={style.canvasField} onDrop={OnEndDraggingFigure} onDragOver={onDragOverHandler}>
            <h1 className={style.fieldTitle}>{title}</h1>
            {items.map(i => <CanvasFigure item={i}/>)}
        </div>
    )
})