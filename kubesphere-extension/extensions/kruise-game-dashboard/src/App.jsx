import React from 'react';
import styled from 'styled-components';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {NavMenu, NavTitle} from '@ks-console/shared';
import {Group} from '@kubed/icons';
import {CssBaseline, KubedConfigProvider} from '@kubed/components';
import {useEffect} from 'react';
// import "@kube-design/components/esm/styles/index.css";

const PageSide = styled.div`
  position: fixed;
  top: 88px;
  padding: 0 20px 40px;
  width: 260px;
  z-index: 99;
`;

const PageMain = styled.div`
  margin-left: 240px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default function App() {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();


    const cluster_id = params.name

    let prefix = "/clusters/" + cluster_id + "/kruise-game-dashboard";

    const navs = [
        {
            name: 'kruise-game-dashboard',
            children: [
                {
                    name: 'overview',
                    icon: 'human',
                    skipAuth: true,
                    title: 'Overview',
                },
                {
                    name: 'gameserversets',
                    icon: 'bird',
                    skipAuth: true,
                    title: 'Workloads',
                    children: [ // Submenu items
                        {
                            name: 'cloneset',
                            title: 'CloneSet',
                            icon: 'copy',
                            skipAuth: true
                        },
                        {
                            name: 'advancedstatefulset',
                            title: 'Advanced StatefulSet',
                            icon: 'database',
                            skipAuth: true
                        },
                        {
                            name: 'advanceddaemonset',
                            title: 'Advanced DaemonSet',
                            icon: 'cloud',
                            skipAuth: true
                        }
                    ] 
                },
                {
                    name: 'gameservers',
                    icon: 'bird',
                    skipAuth: true,
                    title: 'Pods',
                },
            ],
        },
    ];

    useEffect(() => {
        // add default location redirect to overview
        if (location.pathname === prefix) {
            console.log('redirect to overview')
            navigate(location.pathname + "/overview", {replace: true});
        }
    }, []);


    return (
        <>
            <KubedConfigProvider>
                <CssBaseline/>
                <PageSide>
                    <NavTitle
                        icon={<Group variant="light" size={40}/>}
                        title={t('Openkruise-Dashboard')}
                        style={{marginBottom: '20px'}}
                    />
                    <NavMenu navs={navs} pathname={location.pathname} prefix={prefix}/>
                </PageSide>
                <PageMain>
                    <Outlet/>
                </PageMain>
            </KubedConfigProvider>
        </>
    );

}
