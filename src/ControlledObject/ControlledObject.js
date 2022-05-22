import {GiHamburgerMenu} from "react-icons/gi/index";
import {
    BsBellFill,
    BsCameraVideoFill,
    BsFillFileEarmarkBarGraphFill,
    BsGearFill,
    BsInfoCircleFill,
    BsPinMapFill
} from "react-icons/bs/index";
import {IoAddSharp} from "react-icons/io5"
import React, {useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Accordion, Form, Offcanvas, Toast, ToastContainer, Button, Spinner} from "react-bootstrap";
import {useParams} from "react-router";
import {ImTruck} from "react-icons/im/index";
import {TiDelete} from 'react-icons/ti'
import {forEach} from "react-bootstrap/ElementChildren";

export default function ControlledObject(props) {
    let navigate = useNavigate();
    let {id} = useParams();

    const [transportShow, setTransportShow] = useState(false);
    const handleTransportClose = () => setTransportShow(false);
    const handleTransportShow = () => setTransportShow(true);

    const [objectsShow, setObjectsShow] = useState(false);
    const handleObjectsClose = () => setObjectsShow(false);
    const handleObjectsShow = () => setObjectsShow(true);

    const onFileChange = (event) => {
        props.fileUpload(event.target.files[0]);
    }

    const camCheck = (e, index) => {
        const newCamChecked = [...props.isCamChecked]
        newCamChecked[index] = e.target.checked
        props.setCamChecked(newCamChecked)
    }

    const accordionElement = <Accordion alwaysOpen
                                        defaultActiveKey={window.location.pathname !== `/demo/reports/${id}/sheets` ? "0" : "1"}>
        {window.location.pathname !== `/demo/reports/${id}/sheets` && <Accordion.Item eventKey="0">
            <Accordion.Header>Транспорт</Accordion.Header>
            <Accordion.Body>
                <Form>
                    {
                        id && props.objects[id - 1].transport.length > 0 ? props.objects[id - 1].transport.map((item, index) => {
                            return <div key={index}
                                        style={{borderBottom: '.2rem solid #ececec', padding: '12px'}}>
                                <Form.Check
                                    onChange={e => {
                                        const objects = [...props.objects];
                                        const transport = [...objects[id - 1].transport];
                                        transport[e.target.name].isMarker = e.target.checked
                                        objects[id - 1].transport = transport;
                                        props.setObjects(objects);
                                    }}
                                    type={'checkbox'}
                                    label={item.name}
                                    checked={item.isMarker}
                                    name={index}
                                />
                                {
                                    window.location.pathname === `/demo/reports/${id}/video` &&
                                    item.cameras.map((camera, camIndex) => {
                                        return <div key={camIndex}
                                                    style={{paddingLeft: '12px'}}>
                                            <Form.Check
                                                type={'checkbox'}
                                                label={camera}
                                                name={camIndex}
                                                onChange={(e) => {
                                                    camCheck(e, camIndex + (index * 3))
                                                }}
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        }) : <div style={{textAlign: 'center'}}>Нет данных</div>
                    }
                </Form>
            </Accordion.Body>
        </Accordion.Item>
        }
        {
            window.location.pathname === `/demo/reports/${id}/positions` &&
            <Accordion.Item eventKey="1">
                <Accordion.Header>Построить маршрут</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <div style={{
                            borderBottom: '.2rem solid #ececec',
                            padding: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#20305E',
                            cursor: 'pointer',
                            alignItems: 'center'
                        }} onClick={() => {
                            props.setPointsAdditionState(true);
                            handleTransportClose();
                        }}>
                            <div>Добавить точку</div>
                            <IoAddSharp style={{width: '30px', height: '30px', color: '#20305E'}}/>
                        </div>
                        {
                            props.userMapPoints.map((item, index) => {
                                return <div key={index}
                                            style={{
                                                borderBottom: '.2rem solid #ececec',
                                                padding: '12px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                    <div>
                                        {item.lat + " " + item.lng}
                                    </div>
                                    <div style={{cursor: 'pointer'}} onClick={() => {
                                        const newUserMapPoints = props.userMapPoints.filter((item, pointIndex) => pointIndex !== index)
                                        props.setUserMapPoints(newUserMapPoints)
                                    }}>
                                        <TiDelete style={{width: '30px', height: '30px', color: 'red'}}/>
                                    </div>
                                </div>
                            })
                        }
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        }
        {
            window.location.pathname === `/demo/reports/${id}/sheets` &&
            <Accordion.Item eventKey="1">
                <Accordion.Header>Загрузить файл</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Label>Загрузите .xlsx файл</Form.Label>
                        <Form.Control type="file"
                                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                      onChange={onFileChange}/>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        }
        {
            window.location.pathname === `/demo/reports/${id}/sheets` &&
            <Accordion.Item eventKey="2">
                <Accordion.Header>Аналитика</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="primary" style={{
                                width: '250px',
                                height: '60px',
                                wordBreak: 'break-word',
                                whiteSpace: 'normal'
                            }} onClick={props.getFuelResult}>Прогнозирование расхода топлива</Button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="primary" style={{
                                width: '250px',
                                height: '85px',
                                marginTop: '20px',
                                wordBreak: 'break-word',
                                whiteSpace: 'normal'
                            }} onClick={props.getEnginesResult}>Определение класса работоспособности двигателя</Button>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        }
    </Accordion>;
    const linksListElement = <>
        <a className={'link-bar link-bar-desktop'} style={{cursor: 'pointer', marginTop: '20px'}}>
            <GiHamburgerMenu className={'link-bar-icon'} onClick={handleObjectsShow}/>
        </a>
        <Link to={`/demo/reports/${id}`} className={'link-bar'}>
            <BsInfoCircleFill className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/notifications`} className={'link-bar'}>
            <BsBellFill className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/transport`} className={'link-bar'}>
            <ImTruck className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/positions`} className={'link-bar'}>
            <BsPinMapFill className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/video`} className={'link-bar'}>
            <BsCameraVideoFill className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/sheets`} className={'link-bar'}>
            <BsFillFileEarmarkBarGraphFill className={'link-bar-icon'}/>
        </Link>
    </>

    return <div style={{minHeight: '100vh', display: 'flex', flexFlow: 'column'}}>
        <header className={'demo-header'}>
            <div className={'demo-header-content'}>
                <GiHamburgerMenu style={{width: '30px', height: '30px'}} fill={'white'} onClick={handleObjectsShow}/>
                <div></div>
                {
                    !window.location.pathname.match(/^\/demo\/reports\/\d+$/) ?
                        <BsGearFill style={{width: '30px', height: '30px'}} fill={'white'}
                                    onClick={handleTransportShow}/> : <div/>
                }
            </div>
        </header>
        <div className={'demo-wrapper'}>
            <div className={'desktop-left-bar'}>
                <div className={'desktop-left-bar'} style={{position: 'fixed', left: 0, top: 0, height: '100%'}}>
                    {linksListElement}
                </div>
            </div>
            {!window.location.pathname.match(/^\/demo\/reports\/\d+$/)
            && !window.location.pathname.match(/^\/demo\/reports\/\d+\/notifications$/)
            && !window.location.pathname.match(/^\/demo\/reports\/\d+\/transport/)
            && <div className={'accordion-desktop'}>
                {accordionElement}
            </div>
            }
            <Outlet/>
        </div>
        <Offcanvas show={transportShow} onHide={handleTransportClose} placement={'bottom'} style={{height: '70vh'}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Выберите объекты для отображения</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {accordionElement}
            </Offcanvas.Body>
        </Offcanvas>
        <Offcanvas show={objectsShow} onHide={handleObjectsClose} placement={'start'} className={'offcanvas-menu-bar'}>
            <Offcanvas.Body>
                <div style={{paddingTop: '30px'}}>
                    {
                        props.objects.map((item, index) => {
                            return <div key={index} className={'menu-object-item'}
                                        onClick={() => {
                                            navigate("/demo/reports/" + (index + 1), {replace: false})
                                            handleObjectsClose();
                                        }}>
                                {item.name}
                            </div>
                        })
                    }
                </div>
            </Offcanvas.Body>
        </Offcanvas>
        {/*<div style={{position: 'absolute', display: props.isPointsAdditionState? 'block' : 'none', top: "0", left: "50%", transformX: "translate(-50%)"}}>*/}
        {/*    <Toast show={props.isPointsAdditionState} className="p-3" delay={3000} autohide>*/}
        {/*        <Toast.Body>Выберите точку на карте</Toast.Body>*/}
        {/*    </Toast>*/}
        {/*</div>*/}
        <div className={'epic-placeholder'}/>
        <div className={'epic-bar'}>
            {linksListElement}
        </div>
        {
            props.isLoading && <div style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} onClick={e => e.stopPropagation()}>
                <Spinner animation="border" variant="primary" style={{width: '100px', height: '100px'}}/>
            </div>
        }
    </div>
}