from django.http import HttpResponse, FileResponse
from django.template import loader
from .data import plot_loader
from .settings import STATICFILES_DIRS
import os

def index(request):
    template = loader.get_template("index.html")
    context = {
        'title': "Painel de Dados ISP"
    }
    return HttpResponse(template.render(context, request))

def serve_plot(request):
    plot_loader(area='all')
    file_path = os.path.join(STATICFILES_DIRS[0], 'plot.png')
    plot_file = open(file_path, 'rb')
    return FileResponse(plot_file, content_type='image/png')