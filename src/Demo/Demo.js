import React, {useState} from "react";
import {Link, Outlet} from "react-router-dom";
import {Accordion, Form, Offcanvas} from "react-bootstrap";
import './Demo.css'
import {useNavigate} from "react-router-dom";
import {BsColumnsGap, BsBell, BsJoystick, BsCup, BsCameraVideo, BsInfoSquare} from 'react-icons/bs';
import {MdOutlineSettings} from 'react-icons/md'
import {useParams} from "react-router";

export default function Demo(props) {
    let navigate = useNavigate();
    let {id} = useParams();

    const accordionElement = <Accordion alwaysOpen defaultActiveKey={"0"}>
        <Accordion.Item eventKey="0">
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
                            </div>
                        }) : <div style={{textAlign: 'center'}}>Нет данных</div>
                    }
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>;

    const linksListElement = <>
        <Link to={"/demo"} className={'link-bar'}>
            <BsColumnsGap className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/sheets`} className={'link-bar'}>
            <BsBell className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/positions`} className={'link-bar'}>
            <BsJoystick className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/sheets`} className={'link-bar'}>
            <BsCup className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/video`} className={'link-bar'}>
            <BsCameraVideo className={'link-bar-icon'}/>
        </Link>
        <Link to={`/demo/reports/${id}/sheets`} className={'link-bar'}>
            <BsInfoSquare className={'link-bar-icon'}/>
        </Link>
    </>

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div style={{minHeight: '100vh', display: 'flex', flexFlow: 'column'}}>
        <header className={'demo-header'}>
            {window.location.pathname !== "/demo"
            && !window.location.pathname.match(/^\/demo\/reports\/\d+$/) && <div className={'demo-header-content'}>
                <div></div>
                <div></div>
                <MdOutlineSettings style={{width: '30px', height: '30px'}} fill={'white'} onClick={handleShow}/>
            </div>
            }
        </header>
        <div className={'demo-wrapper'}>
            {window.location.pathname !== "/demo" && <>
                <div className={'desktop-left-bar'}>
                    {linksListElement}
                </div>
                {!window.location.pathname.match(/^\/demo\/reports\/\d+$/)
                && <div className={'accordion-desktop'}>
                    {accordionElement}
                </div>
                }
            </>
            }
            {window.location.pathname === "/demo" &&
            <div className={'object-container'}>
                <div className={'object-title'}>
                    Выберите объект
                </div>
                {
                    props.objects.map((item, index) => {
                        return <div className={'object-item'}
                                    onClick={() => navigate("reports/" + (index + 1), {replace: false})}>
                            {item.name}
                        </div>
                    })
                }
            </div>
            }
            <Outlet/>
        </div>
        <Offcanvas show={show} onHide={handleClose} placement={'bottom'} style={{height: '70vh'}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Выберите объекты для отображения</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {accordionElement}
            </Offcanvas.Body>
        </Offcanvas>
        {window.location.pathname !== "/demo" && <>
            <div className={'epic-placeholder'}/>
            <div className={'epic-bar'}>
                {linksListElement}
            </div>
        </>
        }
    </div>
}