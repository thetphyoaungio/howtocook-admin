# Add New Menu
1. core > menu-list.helper.ts

2. core > menu-label.helper.ts

3. core > route-names.helper.ts

4. utils > menu-router.service.ts

5. shared > components > menu-items-container > menu-items-container.component.ts
    # RouteToMenuUIUpdateHandler() //*get specified menu by index of menu-list (according to menu-list.helper.ts!)
    # RouteToChildMenuUIUpdateHandler(menu:any)

6. add routes configurations at "dashboard -> dashboard-routing.module.ts"