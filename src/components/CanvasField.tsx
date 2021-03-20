import {addFigure, CanvasItemType} from "../redux/DnDReducer";
import {useDispatch} from "react-redux";
import React, {DragEvent, useState} from "react";
import style from "../App.module.css";
import {CanvasFigure} from "./CanvasFigure";


type CanvasFieldPropsType = {
    title: string
    items: Array<CanvasItemType>
}

export const CanvasField = React.memo(({title, items}: CanvasFieldPropsType) => {
    const dispatch = useDispatch()
    const [copy, setCopy] = useState(true)

    const OnEndDraggingFigure = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!copy) {
            return
        }
        dispatch(addFigure())
    }

    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div className={style.canvasField} onDrop={OnEndDraggingFigure} onDragOver={onDragOverHandler}
             onDragStart={() => {
                 setCopy(false)
             }}>
            <h1 className={style.fieldTitle}>{title}</h1>
            {items.map(i => <CanvasFigure item={i}/>)}
        </div>
    )
})