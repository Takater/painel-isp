import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from .settings import STATICFILES_DIRS
import os
import base64

def plot_loader(**specs):
    
    # Data specs
    area = specs.get('area')
    city = specs.get('city')
    time = specs.get('time')

    
    df = pd.DataFrame
    if area == 'city':
        df_Cidades_Total = readcsv_path('../PopulacaoEvolucaoMensalMunic.csv')
        df_Cidades_Ano = df_Cidades_Total.groupby('cod_munic', group_keys=True).apply(lambda x: x)
        cidades = df_Cidades_Ano['munic'].unique()
        lista_plots = []

        if city == 'all':
            for cidade in cidades:
                df_city = df_Cidades_Ano[df_Cidades_Ano['munic'] == cidade].groupby('ano').last().reset_index()
                plt.plot(df_city['ano'], df_city['pop_munic'])
                plt.title(f"{df_city['munic'].unique()[0]}")
                plt.xlabel("Ano")
                plt.ylabel("População")
                plt.title(f"{df_city['munic'].unique()[0]}")
                file_name = f"{df_city['munic'].unique()[0].replace(' ', '_')}_plot.png"
                file_path = os.path.join(STATICFILES_DIRS[0], file_name)
                plt.savefig(file_path)
                lista_plots.append(file_name)
                plt.close()
            return lista_plots
        else:
            df_city = df_Cidades_Ano[
                df_Cidades_Ano['munic'] == city if city else df_Cidades_Ano['munic'] == cidades[0]
            ].groupby('ano').last().reset_index()
            plt.plot(df_city['ano'], df_city['pop_munic'])
            plt.title(f"{df_city['munic'].unique()[0]}")
            plt.xlabel("Ano")
            plt.ylabel("População")
            plt.title(f"Crescimento populacional por ano em {df_city['munic'].unique()[0]}")
            file_name = f"{df_city['munic'].unique()[0].replace(' ', '_')}_plot.png"
            file_path = os.path.join(STATICFILES_DIRS[0], file_name)
            plt.savefig(file_path)
            lista_plots.append(file_name)
            plt.close()
            return lista_plots

        

    else:
        if time == 'year':
            df = readcsv_path('../PopulacaoEvolucaoAnualEstado.csv')
            year = df['ano']
            people = df['pop']
            plt.plot(year, people)
            plt.xlabel('Ano')
            plt.ylabel('População')
            plt.title('Crescimento populacional por ano')
            file_name = 'plot.png'
            file_path = os.path.join(STATICFILES_DIRS[0], 'plot.png')
            plt.savefig(file_path)
            plt.close()
            return [file_name]
        
        else:
            N = 250
            df = readcsv_path('../PopulacaoEvolucaoMensalEstado.csv')
            df['data'] = pd.to_datetime(df['mes'].astype(str) + '/' + df['ano'].astype(str), format='%m/%Y')
            df.drop(['mes', 'ano'], axis=1, inplace=True)
            df.set_index('data', inplace=True)
            df.sort_index(inplace=True)
            plt.plot(df.index, df['pop'])
            plt.xticks(rotation=90)
            plt.gca().xaxis.set_major_locator(mdates.MonthLocator())
            plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
            plt.tick_params(axis='x', width=0.5, labelsize=5)
            plt.yscale('linear')
            plt.gca().margins(x=0)
            plt.gcf().canvas.draw()
            tl = plt.gca().get_xticklabels()
            maxsize = max([t.get_window_extent().width for t in tl])
            m = 0.2 # inch margin
            s = maxsize/plt.gcf().dpi*N+2*m
            margin = m/plt.gcf().get_size_inches()[0]
            plt.gcf().subplots_adjust(left=margin, right=1.-margin)
            plt.gcf().set_size_inches(s, plt.gcf().get_size_inches()[1])
            plt.title('Crescimento populacional por mês')
            file_name = 'monthplot.png'
            file_path = os.path.join(STATICFILES_DIRS[0], file_name)
            plt.savefig(file_path)
            plt.close()
            return [file_name]
            


def lista_cidades():
    df = readcsv_path('../PopulacaoEvolucaoMensalMunic.csv')
    cidades = df['munic'].unique().tolist()
    return cidades

def readcsv_path(pathstring):
    df
    try:
        df = pd.read_csv(f'../{pathstring}', sep=';', encoding='latin-1')
    except FileNotFoundError:
        df = pd.read_csv(f'{pathstring}', sep=';', encoding='latin-1')
    
    return df