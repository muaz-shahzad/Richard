from django.contrib import admin
from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Add URL pattern for the expense prediction endpoint
    path('predict/', views.predict_expense, name='predict_expense'),
    # Other URL patterns
    path('api/polygon-data/', views.get_polygon_data, name='get_polygon_data'),
    path('api/top-gainer-data/', views.get_topgainer_data, name='get_topgainer_data'),
    path('api/get_marketnews_data/', views.get_marketnews_data, name='get_marketnews_data'),
    path('api/get_globalmarket_data/', views.get_globalmarket_data, name='get_globalmarket_data'),
    # Catch all other URLs and serve the React frontend
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
