<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class TransactionController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Transaction::class);

        $query = auth()->user()->bankAccount->transactions();
        $transactions = QueryBuilder::for($query)
            ->allowedFilters([
                AllowedFilter::exact('type', 'transactionable_type'),
            ])
            ->with('transactionable')
            ->paginate()
            ->withQueryString();

        return TransactionResource::collection($transactions);
    }
}
