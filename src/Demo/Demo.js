import React, {useState} from "react";
import {Link, Outlet} from "react-router-dom";
import {Accordion, Form, Offcanvas} from "react-bootstrap";
import './Demo.css'
import {useNavigate} from "react-router-dom";
import {BsColumnsGap, BsBell, BsJoystick, BsCup, BsCameraVideo, BsInfoSquare} from 'react-icons/bs';
import {MdOutlineSettings} from 'react-icons/md'

export default function Demo(props) {
    let navigate = useNavigate();
    const accordionElement = <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Транспорт</Accordion.Header>
            <Accordion.Body>
                <Form>
                    {
                        props.transport.map((item, index) => {
                            return <div key={index}
                                        style={{borderBottom: '.2rem solid #ececec', padding: '12px'}}>
                                <Form.Check
                                    onChange={e => {
                                        const transport = [...props.transport];
                                        transport[e.target.name].isMarker = e.target.checked
                                        props.setTransport(transport);
                                    }}
                                    type={'checkbox'}
                                    label={item.name}
                                    checked={item.isMarker}
                                    name={index}
                                />
                            </div>
                        })
                    }
                </Form>
            </Accordion.Body>
        </Accordion.Item>
        {/*<Accordion.Item eventKey="1">*/}
        {/*    <Accordion.Header>Подстанции</Accordion.Header>*/}
        {/*    <Accordion.Body>*/}

        {/*    </Accordion.Body>*/}
        {/*</Accordion.Item>*/}
    </Accordion>;

    const linksListElement = <>
        <Link to={"/demo"} className={'link-bar'}>
            <BsColumnsGap width={30}/>
        </Link>
        <Link to={"/demo/sheets"} className={'link-bar'}>
            <BsBell width={30}/>
        </Link>
        <Link to={"/demo/positions"} className={'link-bar'}>
            <BsJoystick width={30}/>
        </Link>
        <Link to={"/demo/sheets"} className={'link-bar'}>
            <BsCup width={30}/>
        </Link>
        <Link to={"/demo/sheets"} className={'link-bar'}>
            <BsCameraVideo width={30}/>
        </Link>
        <Link to={"/demo/sheets"} className={'link-bar'}>
            <BsInfoSquare width={30}/>
        </Link>
    </>

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div style={{minHeight: '100vh', display: 'flex', flexFlow: 'column'}}>
        <header className={'demo-header'}>
            {window.location.pathname !== "/demo"
            && !window.location.pathname.includes("/demo/reports") && <div className={'demo-header-content'}>
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
                {!window.location.pathname.includes("/demo/reports")
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