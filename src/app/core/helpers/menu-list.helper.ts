import { MenuLabels } from "./menu-label.helper";

const MenuIconPath = '../../../assets/images/shared/menu-sidebar';
const dashboardIcon = 'dashboard.svg';
const tipsIcon = 'tips.svg';
const reportsIcon = 'reports.svg';
const categoriesIcon = 'categories.svg';
const userIcon = 'user.svg';
const adminIcon = 'admin-manage.svg';
const feedbackIcon = 'customer-feedbacks.svg';//customer-feedbacks
const settingIcon = 'setting.svg';

const logoutIcon = 'log-out.svg';

const MENUS = [
    {
        icon:`${MenuIconPath}/black/${dashboardIcon}`, 
        iconfile:dashboardIcon,
        menuLabel:MenuLabels.DASHBOARD,
        childs:[],
        id:'1',
    },
    {
        icon:`${MenuIconPath}/black/${tipsIcon}`,
        iconfile:tipsIcon,
        menuLabel:MenuLabels.TIPS,
        childs:[],
        id:'2',
    },
    {
        icon:`${MenuIconPath}/black/${reportsIcon}`,
        iconfile:reportsIcon,
        menuLabel:MenuLabels.REPORTS,
        id:'3',
        childs:[
            /* {
                icon:'',
                menuLabel:MenuLabels.ADS_REPORT,
                childs:[],
                id:'3-1',
            }, */
            {
                icon:'',
                menuLabel:MenuLabels.NEW_USERS_REPORT,
                childs:[],
                id:'3-2',
            },
            {
                icon:'',
                menuLabel:MenuLabels.DATE_REPORT,
                childs:[],
                id:'3-3',
            },
            {
                icon:'',
                menuLabel:MenuLabels.USERS_REPORT,
                childs:[],
                id:'3-4',
            },
            {
                icon:'',
                menuLabel:MenuLabels.CHEF_USERS_REPORT,
                childs:[],
                id:'3-5',
            },
        ],
    },
    {
        icon:`${MenuIconPath}/black/${categoriesIcon}`,
        iconfile:categoriesIcon,
        menuLabel:MenuLabels.CATEGORIES,
        id:'4',
        childs:[
            {
                icon:'',
                menuLabel:MenuLabels.ALL_CATEGORIES,
                childs:[],
                id:'4-1',
            },
            {
                icon:'',
                menuLabel:MenuLabels.REQUESTED_CATEGORIES,
                childs:[],
                id:'4-2',
            },
        ],
    },
    {
        icon:`${MenuIconPath}/black/${userIcon}`,
        iconfile:userIcon,
        menuLabel:MenuLabels.USERS,
        id:'5',
        childs:[
            {
                icon:'',
                menuLabel:MenuLabels.ALL_USERS,
                childs:[],
                id:'5-1',
            },
            {
                icon:'',
                menuLabel:MenuLabels.NORMAL_USERS,
                childs:[],
                id:'5-2',
            },
            {
                icon:'',
                menuLabel:MenuLabels.CHEF_USERS,
                childs:[],
                id:'5-3',
            },
            {
                icon:'',
                menuLabel:MenuLabels.REQUEST_CHEF_USERS,
                childs:[],
                id:'5-4',
            },
            {
                icon:'',
                menuLabel:MenuLabels.BLOCK_LIST_USERS,
                childs:[],
                id:'5-5',
            },
        ],
    },
    {
        icon:`${MenuIconPath}/black/${adminIcon}`,
        iconfile:adminIcon,
        menuLabel:MenuLabels.ADMIN_MANAGEMENT,
        id:'6',
        childs:[
            {
                icon:'',
                menuLabel:MenuLabels.ADMIN_LIST,
                childs:[],
                id:'6-1',
            }
        ]
    },
    {
        icon:`${MenuIconPath}/black/${feedbackIcon}`,
        iconfile:feedbackIcon,
        menuLabel:MenuLabels.CUSTOM_FEEDBACK,
        id:'7',
        childs:[]
    },
    {
        icon:`${MenuIconPath}/black/${settingIcon}`,
        iconfile:settingIcon,
        menuLabel:MenuLabels.SETTING,
        id:'8',
        childs:[
            {
                icon:'',
                menuLabel:MenuLabels.SETTING_FAQS,
                childs:[],
                id:'8-1',
            },
            {
                icon:'',
                menuLabel:MenuLabels.SETTING_CUSTOM_ADS,
                childs:[],
                id:'8-2',
            },
            {
                icon:'',
                menuLabel:MenuLabels.SETTING_VERSION_UPDATE,
                childs:[],
                id:'8-3',
            }
        ]
    },
    {
        icon:`${MenuIconPath}/black/${logoutIcon}`,
        iconfile:logoutIcon,
        menuLabel:MenuLabels.LOGOUT,
        childs:[],
        id:'9',
    },
];

export { MENUS };