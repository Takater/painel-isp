import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from .settings import STATICFILES_DIRS
import os

def plot_loader(**specs):
    
    # Data specs
    area = specs.get('area')
    city = specs.get('city')
    time = specs.get('time')

    
    df = pd.DataFrame
    if area == 'city':
        df = pd.read_csv('../PopulacaoEvolucaoMensalMunic.csv', sep=';', encoding='latin-1')
        
            
        if time == 'year':
            if city == 'all':
                df_Cidades_Ano = df.groupby('cod_munic', group_keys=True).apply(lambda x: x)
                lista_plots = []
                cidades = lista_cidades()
                for cidade in cidades:
                    df_city = df_Cidades_Ano[df_Cidades_Ano['munic'] == cidade].groupby('ano').last().reset_index()
                    plt.plot(df_city['ano'], df_city['pop_munic'])
                    plt.title(f"{df_city['munic'].unique()[0]}")
                    file_path = os.path.join(STATICFILES_DIRS[0], f"{df_city['munic'].unique()[0].replace(' ', '_')}_plot.png")
                    plt.savefig(file_path)
                    lista_plots.append(file_path)
                return lista_plots

        

    else:
        if time == 'year':
            df = pd.read_csv("../PopulacaoEvolucaoAnualEstado.csv", sep=';')
            year = df['ano']
            people = df['pop']

            plt.plot(year, people)
            plt.xlabel('Ano')
            plt.ylabel('População')
            plt.title('Crescimento populacional por ano')
            file_path = os.path.join(STATICFILES_DIRS[0], 'plot.png')
            plt.savefig(file_path)
            return [file_path]


def lista_cidades():
    df = pd.read_csv("../PopulacaoEvolucaoMensalMunic.csv", sep=';', encoding='latin-1')
    cidades = df['munic'].unique().tolist()
    return cidades