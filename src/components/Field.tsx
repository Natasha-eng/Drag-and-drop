import {changeCanvasStatus, ItemType} from "../redux/DnDReducer";
import {useDispatch} from "react-redux";
import React, {DragEvent} from "react";
import style from "../App.module.css";
import {DndFigure} from "./DndFigure";

type FieldPropsType = {
    title: string
    items: Array<ItemType>
}

export const Field = ({title, items}: FieldPropsType) => {
    const dispatch = useDispatch()

    const OnEndDraggingFigure = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(changeCanvasStatus())
    }

    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div className={style.field} onDrop={OnEndDraggingFigure} onDragOver={onDragOverHandler}>
            <h1 className={style.fieldTitle}>{title}</h1>
            {items.map(i => <DndFigure figureStyle={i.class} item={i}/>)}
        </div>
    )
}

