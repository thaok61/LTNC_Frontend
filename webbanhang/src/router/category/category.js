export default [
    {
        path: '/category/show',
        name: 'ShowCategory',
        component: () => import('../../components/Category/ShowCategory'),
        meta: {
            requiresAuth: true,
            is_admin: true
        }
    }
  ]