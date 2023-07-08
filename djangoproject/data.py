import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from .settings import STATICFILES_DIRS
import os

def plot_loader(**specs):
    df = pd.read_csv("../PopulacaoEvolucaoAnualEstado.csv", sep=';')
    year = df['ano']
    people = df['pop']

    plt.plot(year, people)
    plt.xlabel('Ano')
    plt.ylabel('População')
    plt.title('Crescimento populacional por ano')

    plt.savefig(os.path.join(STATICFILES_DIRS[0], 'plot.png'))