import {GiHamburgerMenu} from "react-icons/gi/index";
import {
    BsBellFill,
    BsCameraVideoFill,
    BsFillFileEarmarkBarGraphFill,
    BsGearFill,
    BsInfoCircleFill,
    BsPinMapFill
} from "react-icons/bs/index";
import React, {useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Accordion, Form, Offcanvas} from "react-bootstrap";
import {useParams} from "react-router";
import {ImTruck} from "react-icons/im/index";

export default function ControlledObject(props) {
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
                                {
                                    window.location.pathname === `/demo/reports/${id}/video` &&
                                    item.cameras.map((camera, camIndex) => {
                                        return <div key={camIndex}
                                                    style={{paddingLeft: '12px'}}>
                                            <Form.Check
                                                type={'checkbox'}
                                                label={camera}
                                                name={camIndex}
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
    </Accordion>;

    const linksListElement = <>
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

    const [transportShow, setTransportShow] = useState(false);
    const handleTransportClose = () => setTransportShow(false);
    const handleTransportShow = () => setTransportShow(true);

    const [objectsShow, setObjectsShow] = useState(false);
    const handleObjectsClose = () => setObjectsShow(false);
    const handleObjectsShow = () => setObjectsShow(true);

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

            <div className={'demo-header-content-desktop'}>
                <a className={'link-bar'} style={{cursor: 'pointer', marginBottom: 0}}>
                    <GiHamburgerMenu className={'link-bar-icon'} onClick={handleObjectsShow}/>
                </a>
            </div>
        </header>
        <div className={'demo-wrapper'}>
            <div className={'desktop-left-bar'}>
                {linksListElement}
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
        <div className={'epic-placeholder'}/>
        <div className={'epic-bar'}>
            {linksListElement}
        </div>
    </div>
}