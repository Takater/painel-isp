from django.http import HttpResponse, FileResponse, JsonResponse 
from django.template import loader
from .data import plot_loader, lista_cidades
from .settings import STATICFILES_DIRS, STATIC_URL
import os

def index(request):
    template = loader.get_template("index.html")
    context = {
        'title': "Painel de Dados ISP"
    }
    return HttpResponse(template.render(context, request), content_type='application/javascript')

def serve_plot(request):
    chosen_area = request.headers.get('Area')
    chosen_city = request.headers.get('City')
    chosen_time = request.headers.get('Time')
    print(f"Variables: {chosen_area}, {chosen_city}, {chosen_time}")
    try:
        plot_list = plot_loader(area=chosen_area, city=chosen_city, time=chosen_time)
        print(plot_list)
        return JsonResponse({'file_paths': plot_list})
    except IndexError:
        return JsonResponse({'file_paths': []})

def load_cities_list(request):
    cities = lista_cidades()
    return JsonResponse({'cidades': cities})