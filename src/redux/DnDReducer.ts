import {v1} from "uuid";

export const firstItemStyle = {
    width: "100px",
    height: "70px",
    backgroundColor: 'blue',
    borderRadius: '50%',
    margin: '10px'
}
export const secondItemStyle = {
    width: "100px",
    height: "70px",
    backgroundColor: 'green',
    margin: '10px',
}

let initialState: InitialStateType = {
    canvasFieldId: 1,
    canvasFigureId: '',
    isChosen: false,
    draggableFigureId: null,
    items: [{id: 1, isCanvas: false, class: firstItemStyle}, {id: 2, isCanvas: false, class: secondItemStyle}],
    canvasItems: [] as Array<CanvasItemType>
}

export let DnDReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case CHANGE_CANVAS_STATUS:
            return {
                ...state,
                items: state.items.map(i => i.id === state.draggableFigureId ? {...i, isCanvas: true} : i)
            }
        case CHOOSE_FIGURE:
            return {...state, canvasFigureId: action.canvasFigureId}

        case DRAG_STARTED:
            return {...state, draggableFigureId: action.figureId}

        case CHANGE_FIGURE_STYLE:
            return {
                ...state,
                canvasItems: state.canvasItems.map(i => i.canvasId === state.canvasFigureId ?
                    {...i, figure: {...i.figure, class: {...i.figure.class, border: '2px solid black'}}} : i)
            }

        case ADD_FIGURE:
            let draggableFigure = state.items.find(i => i.id === state.draggableFigureId) as ItemType

            let newFigure = {
                canvasId: v1(),
                figure: {...draggableFigure, isCanvas: true}
            }
            return {...state, canvasItems: [...state.canvasItems, newFigure]}

        case DELETE_FIGURE:
            return {...state, canvasItems: state.canvasItems.filter(i => i.canvasId !== state.canvasFigureId)}
    }
    return state
}

//actions
const CHANGE_CANVAS_STATUS = 'CHANGE-CANVAS-STATUS'
const DRAG_STARTED = 'DRAG_STARTED'
const CHANGE_FIGURE_STYLE = 'CHANGE_FIGURE_STYLE'
const ADD_FIGURE = 'ADD_FIGURE'
const DELETE_FIGURE = 'DELETE_FIGURE'
const CHOOSE_FIGURE = 'CHOOSE_FIGURE'
const CHOOSE_FIELD = 'CHOOSE_FIELD'

export const changeCanvasStatus = () => ({
    type: CHANGE_CANVAS_STATUS
}) as const

export const dragStarted = (figureId: number, canvasStyle: {}) => ({
    type: DRAG_STARTED,
    figureId,
    canvasStyle
}) as const

export const changeFigureStyle = (canvasId: string) => ({
    type: CHANGE_FIGURE_STYLE,
    canvasId
}) as const

export const chooseFigure = (canvasFigureId: string) => ({
    type: CHOOSE_FIGURE,
    canvasFigureId,
}) as const

export const deleteFigure = (figureId: string) => ({
    type: DELETE_FIGURE,
    figureId
}) as const

export const addFigure = (): AddFigureActionType => ({
    type: ADD_FIGURE
}) as const

type AddFigureActionType = {
    type: 'ADD_FIGURE'
}

//types
type ActionsType = ReturnType<typeof changeCanvasStatus>
    | ReturnType<typeof dragStarted>
    | ReturnType<typeof changeFigureStyle>
    | AddFigureActionType
    | ReturnType<typeof deleteFigure>
    | ReturnType<typeof chooseFigure>

export type CanvasItemType = {
    canvasId: string,
    figure: ItemType
}

export type ItemType = { id: number, isCanvas: boolean, class: {} }

export type InitialStateType = {
    canvasFieldId: number
    canvasFigureId: string
    isChosen: boolean
    draggableFigureId: number | null
    items: Array<ItemType>
    canvasItems: Array<CanvasItemType>
}